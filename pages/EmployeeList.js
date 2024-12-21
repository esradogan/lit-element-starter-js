import {LitElement, html, css} from 'lit';
import '../components/pagination.js';

export class EmployeeList extends LitElement {
  constructor() {
    super();
    this.employees = [];
    this.currentPage = 1;
    this.itemsPerPage = 10; 
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadEmployees(); //buna sonra bak
  }

  static styles = css`
    .container {
      background-color: #f0f0f0;
    }
    .headerContainer {
      padding: 0px 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #ffffff;
    }
    .headerItems {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .employeeContainer {
      padding: 70px;
      background-color: #f0f0f0;
      /* background-color: pink; */

      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
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
      /* display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width :100%; */
    }

    .iconContainer {
      /* display: flex;
      flex-direction: row;
      justify-content: space-evenly;  */
    }

    .icon {
      width: 20px;
      height: 15px;
      pointer-events: none;
    }

    .iconButton {
      border: none;
      pointer-events: auto;
    }

    .listTitles {
      display: grid;
      grid-template-columns: repeat(9, 1fr);
      gap: 10px;
      padding: 10px 0;
      border-bottom: 1px solid #ddd;
      font-weight: bold;
      background-color: #ffffff;
      text-align: left;
    }

    /* .listTitles > div {
      text-align: left;
    } */

    .listRow {
      display: grid;
      grid-template-columns: repeat(9, 1fr);
      gap: 10px;
      padding: 10px 0;
      border-bottom: 0.1 solid lightgrey;
      text-align: left;
      background-color: #ffffff;
    }

    .listRow > div {
      text-align: left;
    }

    .listContainer {
      gap: 5px;
      display: flex;
      flex-direction: column;
    }

    button {
      padding: 5px 10px;
      margin-right: 5px;
    }

    td {
      padding: 20px;
      text-align: left; /* Hücrelerde metin sol tarafa hizalanacak */
      border: 1px solid #ddd; /* Hücre kenarlıkları */
      background-color: #ffffff;
    }

    input[type='checkbox'] {
      width: 17px;
      height: 17px;
      cursor: pointer;
    }
  `;

  async loadEmployees() {
    try {
      const response = await fetch('../data/EmployeeData.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.employees = await response.json();
      this.requestUpdate();
    } catch (error) {
      console.error('Failed to load employees:', error);
    }
  }

    // Sayfa değiştiğinde çalışanların hangi kısmının gösterileceğini belirleyin
    get paginatedEmployees() {
      const startIdx = (this.currentPage - 1) * this.itemsPerPage;
      const endIdx = startIdx + this.itemsPerPage;
      return this.employees.slice(startIdx, endIdx);
    }
  
    // Sayfa değiştiğinde tetiklenecek fonksiyon
    handlePageChange(e) {
      this.currentPage = e.detail;
      this.requestUpdate(); // Sayfa değiştikten sonra bileşeni güncelle
    }

  isListView = true;

  toggleView(value) {
    this.isListView = value === 'list' ? true : false;
    this.requestUpdate();
  }

  renderListView() {
    return html` <div class="listContainer">
      <div class="listTitles">
        <strong>First Name</strong> <strong>Last Name</strong>
        <strong>Date of Employement</strong>
        <strong>Date of Birth</strong>
        <strong>Phone</strong>
        <strong>Email</strong>
        <strong>Department</strong>
        <strong>Position</strong>
        <strong>Actions</strong>
      </div>
      ${this.paginatedEmployees.map(
        (employee) =>
          html`
            <div class="listRow">
              <div>${employee.firstName}</div>
              <div>${employee.lastName}</div>
              <div>${employee.dateOfEmployeement}</div>
              <div>${employee.dateOfBirth}</div>
              <div>${employee.phoneNumber}</div>
              <div>${employee.email}</div>
              <div>${employee.department}</div>
              <div>${employee.position}</div>
              <div><button>Edit</button> <button>Del</button></div>
            </div>
          `
      )}
    </div>`;
  }

  renderTableView() {
    return html`
      <table class="listContainer">
        <thead>
          <tr class="listTitles">
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Employment</th>
            <th>Date of Birth</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${this.employees.map(
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
                <td>${employee.dateOfEmployeement}</td>
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
            <h3>Employees</h3>
            <button class="iconButton">
              <img class="icon" src="/assets/icons/ing_plus.png" />
              Add New
            </button>
          </div>
        </div>

        <div class="employeeContainer">
          <div class="titleButtonContainer">
            <h2>Employee List</h2>
            <div class="iconContainer">
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
              ${this.isListView
                ? this.renderListView()
                : this.renderTableView()}
            </div>
          </div>
        </div>
      </div>

      <pagination-element
        .totalItems="${this.employees.length}"
        .itemsPerPage="${this.itemsPerPage}"
        @page-changed="${this.handlePageChange}"
      >
      </pagination-element>
    `;
  }


}

customElements.define('employee-list', EmployeeList);
