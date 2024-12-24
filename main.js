import { Router } from '@vaadin/router';
import './pages/EmployeeList.js';
import './components/addEditModal.js';
import './components/deleteModal.js';

const outlet = document.getElementById('outlet'); 

const router = new Router(outlet);
router.setRoutes([
  { path: '/', redirect: '/employees' },
  { path: '/employees', component: 'employee-list' },
]);