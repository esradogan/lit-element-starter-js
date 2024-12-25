import { Router } from '@vaadin/router';
import './pages/EmployeeList.js';
import './components/addEditModal.js';
import './components/deleteModal.js';

//I added this route part but I couln^t use because I created with modals to add, edit and delete operations.
const outlet = document.getElementById('outlet'); 

const router = new Router(outlet);
router.setRoutes([
  { path: '/', redirect: '/employees' },
  { path: '/employees', component: 'employee-list' },
]);