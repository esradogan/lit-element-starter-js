import {LitElement, html, css} from 'lit';
import { getMessage } from '../localization/localization.js';


class AddEditModal extends LitElement {
  static properties = {
    isOpen: {type: Boolean},
    isEditMode: {type: Boolean},
    formData: {type: Object},
    invalidFields: {type: Array},
  };

  constructor() {
    super();
    this.isOpen = false;
    this.isEditMode = false;
    this.invalidFields = [];
    this.formData = {
      id:'',
      firstName: '',
      lastName: '',
      dateOfEmployement: '',
      dateOfBirth: '',
      phoneNumber: '',
      email: '',
      department: '',
      position: '',
    };
  }

  static styles = css`
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal.hidden {
      display: none;
    }

    .modalContent {
      background: white;
      padding: 20px;
      border-radius: 8px;
      width: 400px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      position: relative;
    }

    .modalHeader {
      font-size: 1.2em;
      margin-bottom: 10px;
      font-weight: bold;
      text-align: left;
      color: #ff6200;
    }

    .modalFooter {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }

    .input {
      width: calc(100% - 20px);
      padding: 10px;
      margin: 10px 0;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }

    .input.error {
      border-color: red;
      background-color: #ffe6e6;
    }

    .error-message {
      color: red;
      font-size: 0.8em;
      display: none;
    }

    .error-message.active {
      display: block;
    }

    .button {
      padding: 5px 10px;
      border: 1px solid navy;
      border-radius: 4px;
      cursor: pointer;
    }

    .button:hover {
      background-color: #0056b3;
    }

    .cancelButton {
      padding: 5px 10px;
      border: 1px solid navy;
      border-radius: 4px;
      background-color: #ffffff;
      margin-right: 3px;
      cursor: pointer;
    }
    .proceedButton {
      padding: 5px 10px;
      border: navy;
      border-radius: 4px;
      background-color: #ff6200;
      cursor: pointer;
      color: white;
    }

    .closeButton {
      position: absolute;
      top: 10px;
      right: 10px;
      background: transparent;
      border: none;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      color: #333;
    }

    .closeButton:hover {
      color: red;
    }

    .input.error {
      border: 1px solid red;
    }
  `;

  handleInputChange(event, key) {
    this.formData = {...this.formData, [key]: event.target.value};
    this.validateFields();
    // if (this.invalidFields.includes(key)) {
    //   this.invalidFields = this.invalidFields.filter((field) => field !== key);
    // }
  }

  updated(changedProperties) {
    if (changedProperties.has('isOpen') && this.isOpen) {
      this.invalidFields = []; 
    }
  }

  validateFields() {
    const requiredFields = [
      'firstName',
      'lastName',
      'dateOfEmployement',
      'email',
      'phoneNumber',
      'department',
      'position',
    ];
    const invalidFields = requiredFields.filter(
      (field) => !this.formData[field]
    );

    if (this.formData.email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.formData.email)) {
        invalidFields.push('email');
      }
    }

    if (this.formData.phoneNumber) {
      const phonePattern = /^[0-9]{10}$/;
      if (!phonePattern.test(this.formData.phoneNumber)) {
        invalidFields.push('phoneNumber');
      }
    }
    
    this.invalidFields = invalidFields;
    console.log(this.invalidFields);
    return invalidFields.length === 0;
  }

  closeModal() {
    this.isOpen = false;
    this.dispatchEvent(new CustomEvent('close-modal', {detail: 'close'}));
  }

  formatDateToOutput(date) {
    const [year, month, day] = date.split('-');
    return `${day}.${month}.${year}`;
  }

  saveData() {
    if (!this.validateFields()) {
      //   alert('Please fill all required fields correctly.');
      return;
    }

    this.isOpen = false;
    this.dispatchEvent(
      new CustomEvent('navigate-to-list', {detail: 'employeeList'})
    );

    const formattedData = {
      ...this.formData,
      dateOfEmployement: this.formatDateToOutput(this.formData.dateOfEmployement),
      dateOfBirth: this.formatDateToOutput(this.formData.dateOfBirth),
    };
  
    this.dispatchEvent(
      new CustomEvent('save-data', {
        detail: formattedData,
      })
    );
  }

  render() {
    return html`
      <div class="modal ${this.isOpen ? '' : 'hidden'}">
        <div class="modalContent">
          <button class="closeButton" @click="${this.closeModal}">x</button>
          <div class="modalHeader">
            ${this.isEditMode ? getMessage('editEmployee') : getMessage('createEmployee')}
          </div>

          <input
            class="input ${this.invalidFields.includes('firstName')
              ? 'error'
              : ''} "
            type="text"
            placeholder="First Name"
            .value="${this.formData.firstName}"
            @input="${(e) => this.handleInputChange(e, 'firstName')}"
          />
          <input
            class="input ${this.invalidFields.includes('lastName')
              ? 'error'
              : ''}"
            type="text"
            placeholder="Last Name"
            .value="${this.formData.lastName}"
            @input="${(e) => this.handleInputChange(e, 'lastName')}"
          />
          <input
            class="input ${this.invalidFields.includes('dateOfEmployement')
              ? 'error'
              : ''} "
            type="date"
            placeholder="Date of Employement"
            .value="${this.formData.dateOfEmployement}"
            @input="${(e) => this.handleInputChange(e, 'dateOfEmployement')}"
          />
          <input
            class="input"
            type="date"
            placeholder="Date of Birth"
            .value="${this.formData.dateOfBirth}"
            @input="${(e) => this.handleInputChange(e, 'dateOfBirth')}"
          />
          <input
            class="input ${this.invalidFields.includes('phoneNumber')
              ? 'error'
              : ''} "
            type="tel"
            placeholder="Phone Number"
            .value="${this.formData.phoneNumber}"
            @input="${(e) => this.handleInputChange(e, 'phoneNumber')}"
          />
          <input
            class="input ${this.invalidFields.includes('email')
              ? 'error'
              : ''} "
            type="email"
            placeholder="Email Address"
            .value="${this.formData.email}"
            @input="${(e) => this.handleInputChange(e, 'email')}"
          />
          <select
            class="input ${this.invalidFields.includes('department')
              ? 'error'
              : ''} "
            .value="${this.formData.department}"
            @change="${(e) => this.handleInputChange(e, 'department')}"
          >
            <option value="" disabled selected>Select Department</option>
            <option value="Analytics">Analytics</option>
            <option value="Tech">Tech</option>
          </select>

          <select
            class="input ${this.invalidFields.includes('position')
              ? 'error'
              : ''} "
            .value="${this.formData.position}"
            @change="${(e) => this.handleInputChange(e, 'position')}"
          >
            <option value="" disabled selected>Select Position</option>
            <option value="Junior">Junior</option>
            <option value="Medior">Medior</option>
            <option value="Senior">Senior</option>
          </select>
          <div class="modalFooter">
            <button class="cancelButton" @click="${this.closeModal}">
              Cancel
            </button>
            <button class="proceedButton" @click="${this.saveData}">
              Proceed
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('add-edit-modal', AddEditModal);
