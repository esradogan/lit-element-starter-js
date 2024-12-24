import { fixture, html, expect } from '@open-wc/testing';
import '../pages/EmployeeList.js';

describe('EmployeeList Component', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<employee-list></employee-list>`);
  });

  it('Bileşen render edilmeli', () => {
    expect(element).to.exist;
  });

  it('Dil Türkçe ve İngilizce arasında değiştirilmeli', () => {
    const initialLang = document.documentElement.lang || 'en';
    element.toggleLanguage();
    const newLang = document.documentElement.lang;
    expect(newLang).to.not.equal(initialLang);
    expect(['en', 'tr']).to.include(newLang);
  });

  it('Modal ekleme modunda açılmalı', () => {
    element.openModal(false);
    expect(element.isModalOpen).to.be.true;
    expect(element.isEditMode).to.be.false;
  });

  it('Modal düzenleme modunda açılmalı', () => {
    const mockEmployee = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    };
    element.openModal(true, mockEmployee);
    expect(element.isModalOpen).to.be.true;
    expect(element.isEditMode).to.be.true;
    expect(element.selectedEmployee).to.deep.equal(mockEmployee);
  });

  it('Arama sorgusuna göre çalışanlar filtrelenmeli', () => {
    element.employees = [
      { id: 1, firstName: 'Alice', lastName: 'Smith' },
      { id: 2, firstName: 'Bob', lastName: 'Brown' },
    ];
    element.handleSearchInput({ target: { value: 'alice' } });
    const filteredEmployees = element.filteredEmployees;
    expect(filteredEmployees).to.have.lengthOf(1);
    expect(filteredEmployees[0].firstName).to.equal('Alice');
  });

  it('Çalışanlar sayfalara ayrılmalı', () => {
    element.employees = Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      firstName: `Çalışan ${i + 1}`,
    }));
    element.currentPage = 2;
    const paginatedEmployees = element.paginatedEmployees;
    expect(paginatedEmployees).to.have.lengthOf(10);
    expect(paginatedEmployees[0].id).to.equal(11);
  });

  it('Çalışan silme işlemi yapılmalı', () => {
    const mockEmployee = { id: 1, firstName: 'Test', lastName: 'User' };
    element.employees = [mockEmployee];
    element.deleteEmployee(mockEmployee);
    expect(element.employees).to.have.lengthOf(0);
  });
});
