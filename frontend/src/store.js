import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { employeesReducer, employeeDetailsReducer, newCommentReducer, 
    newEmployeeReducer, employeeReducer, 
    employeeCommentsReducer, commentReducer } from './reducers/employeeReducers'
import { authReducer, userReducer, forgotPasswordReducer } from './reducers/userReducers'

const reducer = combineReducers({
    employees: employeesReducer,
    employeeDetails: employeeDetailsReducer,
    newEmployee: newEmployeeReducer,
    employeeComments: employeeCommentsReducer,
    comment: commentReducer,
    employee: employeeReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    newComment: newCommentReducer

})

let initialState = {}

const middleWare = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)))

export default store;