// import {html} from 'lit';


// export const EmployeeListView = (employees, onEdit, onDelete) => html`
//   <div class="listContainer">
//     <div class="listTitles">
//       <strong>First Name</strong>
//       <strong>Last Name</strong>
//       <strong>Date of Employment</strong>
//       <strong>Date of Birth</strong>
//       <strong>Phone</strong>
//       <strong>Email</strong>
//       <strong>Department</strong>
//       <strong>Position</strong>
//       <strong>Actions</strong>
//     </div>
//     ${employees.map(
//       (employee) => html`
//         <div class="listRow">
//           <div>${employee.firstName}</div>
//           <div>${employee.lastName}</div>
//           <div>${employee.dateOfEmployement}</div>
//           <div>${employee.dateOfBirth}</div>
//           <div>${employee.phoneNumber}</div>
//           <div>${employee.email}</div>
//           <div>${employee.department}</div>
//           <div>${employee.position}</div>
//           <div>
//             <button @click="${() => onEdit(employee)}">Edit</button>
//             <button @click="${() => onDelete(employee)}">Delete</button>
//           </div>
//         </div>
//       `
//     )}
//   </div>
// `;
