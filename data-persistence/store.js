import {createStore} from 'redux';

const initialState = {
  employees: [],
};

const reducer = (state = initialState, action) => {
    // state.employees.forEach((employee) => {
    //     console.log('Employee ID:', employee.id, 'Payload ID:', action.payload.id, action.payload);
    //   });

  switch (action.type) {
    case 'LOAD_EMPLOYEES':
      return {
        ...state,
        employees: action.payload,
      };
    case 'ADD_EMPLOYEE':
        return {
            ...state,
            employees: [...state.employees, { ...action.payload}],
      };
    case 'EDIT_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.map((employee) =>
          employee.id === action.payload.id ? action.payload : employee
        ),
      };
    case 'DELETE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => employee.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

const saveStateToLocalStorage = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('reduxState', serializedState);
    } catch (e) {
      console.error("Could not save state", e);
    }
  };
  
  const loadStateFromLocalStorage = () => {
    try {
      const serializedState = localStorage.getItem('reduxState');
      if (serializedState === null) return undefined;
      return JSON.parse(serializedState);
    } catch (e) {
      console.error("Could not load state", e);
      return undefined;
    }
  };
const persistedState = loadStateFromLocalStorage();
const store = createStore(reducer, persistedState);

store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});

export default store;

