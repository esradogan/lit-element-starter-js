import {LitElement, html, css} from 'lit';
import store from '../data-persistence/store.js';
import '../components/pagination.js';
import '../components/addEditModal.js';
import '../components/deleteModal.js';
import {getMessage} from '../localization/localization.js';

export class EmployeeList extends LitElement {
  static properties = {
    isModalOpen: {type: Boolean},
    isDeleteModalOpen: {type: Boolean},
    isEditMode: {type: Boolean},
    selectedEmployee: {type: Object},
    formData: {type: Object},
    employees: {type: Array},
    searchQuery: {type: String},
  };

  constructor() {
    super();
    this.employees = [];
    store.subscribe(() => {
      const state = store.getState();
      this.employees = [...state.employees];
    });
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.isModalOpen = false;
    this.isEditMode = false;
    this.selectedEmployee = null;
    this.formData = this.formData || null;
    this.isDeleteModalOpen = false;
    this.searchQuery = '';
  }

  deleteEmployee(employee) {
    store.dispatch({type: 'DELETE_EMPLOYEE', payload: employee});
    alert('Employee deleted successfully!');
  }

  openModal(isEdit, employee = null) {
    this.isModalOpen = true;
    this.isEditMode = isEdit;
    this.selectedEmployee = employee || {
      id: null,
      firstName: '',
      lastName: '',
      dateOfEmployement: '',
      dateOfBirth: '',
      phoneNumber: '',
      email: '',
      department: '',
      position: '',
    };

    this.selectedEmployee.dateOfEmployement = employee?.dateOfEmployement
      ? this.formatDateToInput(employee.dateOfEmployement)
      : '';
    this.selectedEmployee.dateOfBirth = employee?.dateOfBirth
      ? this.formatDateToInput(employee.dateOfBirth)
      : '';

    this.formData = {...this.selectedEmployee};
    this.requestUpdate();
    console.log('formData:', this.formData);
  }

  formatDateToInput(date) {
    const [day, month, year] = date.split('.');
    return `${year}-${month}-${day}`;
  }

  handleDelete(event) {
    const employee = event.detail;
    this.deleteEmployee(employee);
    this.isDeleteModalOpen = false;
  }

  openDeleteModal(employee) {
    this.selectedEmployee = employee;
    this.isDeleteModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.formData = null;
  }

  saveData(event) {
    console.log('Saved Data:', event.detail);
    const employee = event.detail;
    if (this.isEditMode) {
      store.dispatch({type: 'EDIT_EMPLOYEE', payload: employee});
      console.log('Redux state after update:', store.getState());
    } else {
      store.dispatch({
        type: 'ADD_EMPLOYEE',
        payload: {...employee, id: Date.now()},
      });
    }
    this.closeModal();
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadEmployees(); //buna sonra bak
    const savedLang = localStorage.getItem('lang') || 'en';
    document.documentElement.lang = savedLang;
    this.requestUpdate();
  }

  static styles = css`
    html,
    body {
      margin: 0;
      padding: 0;
      height: 100%;
    }

    .container {
      background-color: #f0f0f0;
      min-height: 100vh;
      /* display: flex;
      flex-direction: column; */
      padding: 20px;
      box-sizing: border-box;
    }

    .headerContainer {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1000;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #ffffff;
      padding: 10px 20px;
      box-sizing: border-box;
    }

    .headerItems {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .addNewHeaderButton {
      border-radius: 4px;
      cursor: pointer;
      white-space: nowrap;
      border: none;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      background-color: #ffffff;
      color: #ff6200;
      display: flex;
      align-items: center;
    }

    button:active {
      transform: scale(0.95);
    }

    button:hover {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    }

    .employeeContainer {
      /* padding: 70px;
      background-color: #f0f0f0; */
      /* background-color: pink; */
      /* 
      display: flex;
      flex-direction: row;
      justify-content: space-evenly; */

      margin-top: 20px;
      background-color: #f0f0f0;
      border: 1px solid #eaeaea;
      border-radius: 8px;
      padding: 20px;
    }

    .employeeContainerIcon {
      width: 30px;
      height: 30px;
    }

    h3 {
      color: #ff6200;
      font-size: 15px;
    }

    h2 {
      color: #ff6200;
      font-weight: bold;
    }

    strong {
      color: #ff6200;
    }

    th {
      color: #ff6200;
    }

    .titleButtonContainer {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .iconContainer {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
    }

    .icon {
      width: 20px;
      height: 15px;
      margin-right: 2px;
      pointer-events: none;
    }

    .iconButton {
      border: none;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .iconContainer input[type='text'] {
      padding: 5px;
      border-radius: 4px;
      border: 1px solid #e55b00;
    }

    .listTitles {
      display: grid;
      grid-template-columns: repeat(9, 1fr);
      gap: 10px;
      padding: 15px;
      border-bottom: 1px solid #ddd;
      border-radius: 8px;
      font-weight: bold;
      background-color: #ffffff;
      text-align: left;
    }

    /* .listTitles > div {
      text-align: left;
    } */

    .listRow {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
      gap: 10px;
      background-color: #ffffff;
      /* border: 1px solid #e0e0e0; */
      border-radius: 8px;
      padding: 15px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .listRow:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .listRow div {
      text-align: left;
      font-size: 15px;
      font-weight: 500;
      color: #333;
    }

    .listRow button {
      background-color: #ff6200;
      color: #fff;
      border: none;
      border-radius: 4px;
      padding: 5px 10px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .listRow button:hover {
      background-color: #e55b00;
    }

    .listContainer {
      gap: 5px;
      display: flex;
      flex-direction: column;
    }

    button {
      padding: 5px 10px;
      border: none;
    }

    /* td {
      padding: 20px;
      text-align: left;
      border: 1px solid #ddd;
      background-color: #ffffff;
    } */

    .tableContainer {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }

    .tableContainer th,
    .tableContainer td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #eaeaea;
      word-wrap: break-word;
    }

    .tableContainer th {
      background-color: #ffffff;
      color: #ff6200;
      font-weight: bold;
    }

    .tableContainer td {
      background-color: #ffffff;
      color: #333;
    }

    input[type='checkbox'] {
      width: 17px;
      height: 17px;
      cursor: pointer;
    }

    .pagination-container {
      position: sticky;
      bottom: 0;
      width: 100%;
      background-color: #fff;
      z-index: 10;
    }

    .toggleLangButton {
      border-radius: 4px;
      border: none;
      background: none;
      cursor: pointer;
      padding: 5px;
    }
  `;

  async loadEmployees() {
    try {
      const response = await fetch('../data/EmployeeData.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const uniqueEmployees = Object.values(
        data.reduce((acc, employee) => {
          acc[employee.email] = employee;
          return acc;
        }, {})
      );
      const employeesWithId = uniqueEmployees.map((employee, index) => ({
        ...employee,
        id: index + 1,
      }));
      store.dispatch({type: 'LOAD_EMPLOYEES', payload: employeesWithId});
      // this.requestUpdate();
    } catch (error) {
      console.error('Failed to load employees:', error);
    }
  }

  handleSearchInput(e) {
    this.searchQuery = e.target.value.toLowerCase();
    this.currentPage = 1; 
    this.requestUpdate();
  }

  get filteredEmployees() {
    if (!this.searchQuery) {
      return this.employees; // Arama kutusu boşsa, tüm kayıtlar
    }
    return this.employees.filter((emp) => {
      // Arama koşulunu istediğiniz gibi genişletebilirsiniz:
      const fullName = (emp.firstName + ' ' + emp.lastName).toLowerCase();
      const phone = emp.phoneNumber?.toLowerCase() || '';
      const email = emp.email?.toLowerCase() || '';
  
      // Basit bir örnek: Arama metni firstName, lastName, phone veya email içinde geçiyorsa
      return (
        fullName.includes(this.searchQuery) ||
        phone.includes(this.searchQuery) ||
        email.includes(this.searchQuery)
      );
    });
  }

  get paginatedEmployees() {
    const filtered = this.filteredEmployees;
    const startIdx = (this.currentPage - 1) * this.itemsPerPage;
    const endIdx = startIdx + this.itemsPerPage;
    return filtered.slice(startIdx, endIdx);
  }

  handlePageChange(e) {
    this.currentPage = e.detail;
    this.requestUpdate();
  }

  isListView = true;

  toggleView(value) {
    this.isListView = value === 'list' ? true : false;
    this.requestUpdate();
  }

  toggleLanguage() {
    const currentLang = document.documentElement.lang || 'en';
    const newLang = currentLang === 'tr' ? 'en' : 'tr';
    document.documentElement.lang = newLang;
    localStorage.setItem('lang', newLang);
    this.requestUpdate();
  }

  renderListView() {
    return html` <div class="listContainer">
      <div class="listTitles">
        <strong>${getMessage('firstName')}</strong>
        <strong>${getMessage('lastName')}</strong>
        <strong>${getMessage('dateOfEmployement')}</strong>
        <strong>${getMessage('dateOfBirth')}</strong>
        <strong>${getMessage('phone')}</strong>
        <strong>${getMessage('email')}</strong>
        <strong>${getMessage('department')}</strong>
        <strong>${getMessage('position')}</strong>
        <strong>${getMessage('actions')}</strong>
      </div>
      ${this.paginatedEmployees.map(
        (employee) =>
          html`
            <div class="listRow">
              <div>${employee.firstName}</div>
              <div>${employee.lastName}</div>
              <div>${employee.dateOfEmployement}</div>
              <div>${employee.dateOfBirth}</div>
              <div>${employee.phoneNumber}</div>
              <div>${employee.email}</div>
              <div>${employee.department}</div>
              <div>${employee.position}</div>
              <div>
                <button @click="${() => this.openModal(true, employee)}">
                  Edit
                </button>
                <button @click="${() => this.openDeleteModal(employee)}">
                  Delete
                </button>
              </div>
            </div>
          `
      )}
    </div>`;
  }

  renderTableView() {
    return html`
      <table class="tableContainer">
        <thead>
          <tr class="">
            <th></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Employement</th>
            <th>Date of Birth</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${this.paginatedEmployees.map(
            (employee) => html`
              <tr>
                <td>
                  <input
                    type="checkbox"
                    name="selectEmployee"
                    value="${employee.id}"
                  />
                </td>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.dateOfEmployement}</td>
                <td>${employee.dateOfBirth}</td>
                <td>${employee.phoneNumber}</td>
                <td>${employee.email}</td>
                <td>${employee.department}</td>
                <td>${employee.position}</td>
                <td><button>Edit</button> <button>Del</button></td>
              </tr>
            `
          )}
        </tbody>
      </table>
    `;
  }

  render() {
    console.log(this.employees);
    return html`
      <div class="container">
        <div class="headerContainer">
          <div class="headerItems">
            <img
              class="employeeContainerIcon"
              src="/assets/icons/ING_bank.png"
            />
            <h3>ING</h3>
          </div>

          <div class="headerItems">
            <img
              class="employeeContainerIcon"
              src="/assets/icons/ing_employee.png"
            />
            <h3>${getMessage('employeeList')}</h3>
            <button
              class="addNewHeaderButton"
              @click="${() => this.openModal(false, this.employee)}"
            >
              <img class="icon" src="/assets/icons/ing_plus.png" />
              ${getMessage('addNew')}
            </button>

            <div class="headerItems">
              <button class="toggleLangButton" @click="${this.toggleLanguage}">
                <img
                  class="icon"
                  src=${document.documentElement.lang === 'tr'
                    ? '/assets/icons/tr.png'
                    : '/assets/icons/uk.png'}
                  alt="Language Toggle"
                />
              </button>
            </div>
          </div>
        </div>

        <div class="employeeContainer">
          <div class="titleButtonContainer">
            <h2>${getMessage('employeeList')}</h2>

            <div class="iconContainer">
              <input
                type="text"
                placeholder="Search..."
                @input="${this.handleSearchInput}"
              />
              <button
                class="iconButton"
                @click=${() => this.toggleView('list')}
              >
                <img class="icon" src="/assets/icons/ham.png" />
              </button>

              <button
                class="iconButton"
                @click=${() => this.toggleView('table')}
              >
                <img class="icon" src="/assets/icons/table.png" />
              </button>
            </div>
          </div>

          <div>
            ${this.isListView ? this.renderListView() : this.renderTableView()}
          </div>

          <add-edit-modal
            .isOpen="${this.isModalOpen}"
            .isEditMode="${this.isEditMode}"
            .formData="${this.formData}"
            @close-modal="${this.closeModal}"
            @save-data="${this.saveData}"
          ></add-edit-modal>

          <delete-modal
            .isOpen="${this.isDeleteModalOpen}"
            .employee="${this.selectedEmployee}"
            @close-modal="${() => (this.isDeleteModalOpen = false)}"
            @confirm-delete=${this.handleDelete}
          ></delete-modal>

          <div class="pagination-container">
            <pagination-element
              .totalItems="${this.employees.length}"
              .itemsPerPage="${this.itemsPerPage}"
              @page-changed="${this.handlePageChange}"
            >
            </pagination-element>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('employee-list', EmployeeList);
