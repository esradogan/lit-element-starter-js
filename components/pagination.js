import {LitElement, html, css} from 'lit';

class Pagination extends LitElement {
  constructor() {
    super();
    this.totalItems = 0;
    this.itemsPerPage = 10;
    this.currentPage = 1;
  }

  static styles = css`

    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }

    button {
      padding: 8px 12px;
      cursor: pointer;
      font-size: 16px;
      border: none;
    }

    button:disabled {
      cursor: not-allowed;
    }
  `;

  get totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  changePage(page) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.requestUpdate();
      this.dispatchEvent(new CustomEvent('page-changed', {detail: page}));
    }
  }

  goToPreviousPage() {
    this.changePage(this.currentPage - 1);
  }

  goToNextPage() {
    this.changePage(this.currentPage + 1);
  }

  render() {
  
    return html`
        <div class="pagination">
          <button
            @click="${this.goToPreviousPage}"
            ?disabled="${this.currentPage === 1}"
          >
            <
          </button>
          <span> ${this.currentPage} of ${this.totalPages}</span>
          <button
            @click="${this.goToNextPage}"
            ?disabled="${this.currentPage === this.totalPages}"
          >
            >
          </button>
        </div>
    `;
  }
}

customElements.define('pagination-element', Pagination);
