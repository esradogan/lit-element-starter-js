import {LitElement, html, css} from 'lit';

class DeleteModal extends LitElement {
  static properties = {
    isOpen: {type: Boolean},
    employee: {type: Object},
  };

  constructor() {
    super();
    this.isOpen = false;
    this.employee = null;
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
      max-width: 400px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      text-align: left;
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
      cursor: pointer;
    }

    .proceedButton {
      padding: 5px 10px;
      border: navy;
      border-radius: 4px;
      margin-right: 3px;
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
  `;

  closeModal() {
    this.isOpen = false;
    this.dispatchEvent(new CustomEvent('close-modal', {detail: 'close'}));
  }

  confirmDelete() {
    this.dispatchEvent(
      new CustomEvent('confirm-delete', {detail: this.employee})
    );
    this.closeModal();
  }

  render() {
    return html`
      <div class="modal ${this.isOpen ? '' : 'hidden'}">
        <div class="modalContent">
          <button class="closeButton" @click="${this.closeModal}">x</button>
          <div class="modalHeader">Are you sure?</div>

          <p>
            Selected employee record ${this.employee?.firstName}
            ${this.employee?.lastName} will be deleted
          </p>
          <div class="modalFooter">
            <button class="button proceedButton" @click="${this.confirmDelete}">
              Proceed
            </button>
            <button class="cancelButton" @click="${this.closeModal}">
              Cancel
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('delete-modal', DeleteModal);
