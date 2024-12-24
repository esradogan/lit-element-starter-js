import {html} from 'lit';

export const EmployeeTableView = (employees, onEdit, onDelete) => html`
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
      ${employees.map(
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
            <td><button @click="${() => onEdit(employee)}">Edit</button>
            <button @click="${() => onDelete(employee)}">Delete</button></td>
          </tr>
        `
      )}
    </tbody>
  </table>
`;
