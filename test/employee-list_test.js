import { fixture, html, expect } from '@open-wc/testing';
import '../pages/EmployeeList.js';
import '../components/addEditModal.js'; 

describe('AddEditModal Component', () => {
  it('Should render correctly', async () => {
    const element = await fixture(html`<add-edit-modal></add-edit-modal>`);
    expect(element).to.exist;
  });
});

describe('EmployeeList Component', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<employee-list></employee-list>`);
  });

  it('The component should render', () => {
    expect(element).to.exist;
  });
  
  it('Should toggle language between Turkish and English', () => {
    const initialLang = document.documentElement.lang || 'en';
    element.toggleLanguage();
    const newLang = document.documentElement.lang;
    expect(newLang).to.not.equal(initialLang);
    expect(['en', 'tr']).to.include(newLang);
  });
  
  it('Modal should open in add mode', () => {
    element.openModal(false);
    expect(element.isModalOpen).to.be.true;
    expect(element.isEditMode).to.be.false;
  });
  
  it('Modal should open in edit mode', () => {
    const mockEmployee = {
      id: 1,
      firstName: 'Esra',
      lastName: 'Bayram',
      email: 'esra.bayram@example.com',
    };
    element.openModal(true, mockEmployee);
    expect(element.isModalOpen).to.be.true;
    expect(element.isEditMode).to.be.true;
    expect(element.selectedEmployee).to.deep.equal(mockEmployee);
  });
  
  it('Should filter employees based on the search query', () => {
    element.employees = [
      { id: 1, firstName: 'Esra', lastName: 'Bayram' },
      { id: 2, firstName: 'Test', lastName: 'User' },
    ];
    element.handleSearchInput({ target: { value: 'esra' } });
    const filteredEmployees = element.filteredEmployees;
    expect(filteredEmployees).to.have.lengthOf(1);
    expect(filteredEmployees[0].firstName).to.equal('Esra');
  });
  
  it('Employees should be paginated', () => {
    element.employees = Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      firstName: `Employee ${i + 1}`,
    }));
    element.currentPage = 2;
    const paginatedEmployees = element.paginatedEmployees;
    expect(paginatedEmployees).to.have.lengthOf(10);
    expect(paginatedEmployees[0].id).to.equal(11);
  });

  it('Should delete an employee', async () => {
    const mockEmployee = { id: 1, firstName: 'Esra', lastName: 'Bayram' };
    element.employees = [mockEmployee];
    await element.updateComplete;
    expect(element.employees).to.have.lengthOf(1);
    element.deleteEmployee(mockEmployee);
    await element.updateComplete; 
    expect(element.employees).to.have.lengthOf(0);
  });
  
});


