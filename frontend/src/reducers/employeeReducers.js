import { ALL_EMPLOYEES_REQUEST, 
    ALL_EMPLOYEES_SUCCESS, 
    ALL_EMPLOYEES_FAIL, 
    ADMIN_EMPLOYEES_REQUEST, 
    ADMIN_EMPLOYEES_SUCCESS, 
    ADMIN_EMPLOYEES_FAIL, 
    NEW_EMPLOYEE_REQUEST,
    NEW_EMPLOYEE_SUCCESS,
    NEW_EMPLOYEE_RESET,
    NEW_EMPLOYEE_FAIL,
    DELETE_EMPLOYEE_REQUEST,
    DELETE_EMPLOYEE_SUCCESS,
    DELETE_EMPLOYEE_FAIL,
    DELETE_EMPLOYEE_RESET,
    UPDATE_EMPLOYEE_REQUEST,
    UPDATE_EMPLOYEE_SUCCESS,
    UPDATE_EMPLOYEE_FAIL,
    UPDATE_EMPLOYEE_RESET,
    EMPLOYEE_DETAILS_REQUEST, 
    EMPLOYEE_DETAILS_SUCCESS, 
    EMPLOYEE_DETAILS_FAIL,
    NEW_COMMENT_REQUEST,
    NEW_COMMENT_SUCCESS,
    NEW_COMMENT_RESET,
    NEW_COMMENT_FAIL,
    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_RESET,
    DELETE_COMMENT_FAIL,
    GET_COMMENTS_REQUEST,
    GET_COMMENTS_SUCCESS,
    GET_COMMENTS_FAIL,
    UPDATE_COMMENT_REQUEST,
    UPDATE_COMMENT_SUCCESS,
    UPDATE_COMMENT_FAIL,
    UPDATE_COMMENT_RESET,
    CLEAR_ERRORS } from '../constants/employeeConstants'

export const employeesReducer = (state = { employees: [] }, action) => {
    switch(action.type) {

        case ALL_EMPLOYEES_REQUEST:
        case ADMIN_EMPLOYEES_REQUEST:
            return { 
                loading: true,
                employees: []
            }

        case ALL_EMPLOYEES_SUCCESS:
            return { 
                loading: false,
                employees: action.payload.employees,
                employeeCount: action.payload.employeeCount,
                resPerPage: action.payload.resPerPage,
                filteredEmployeesCount: action.payload.filteredEmployeesCount
            }
        case ADMIN_EMPLOYEES_SUCCESS:
            return { 
                loading: false,
                employees: action.payload
            }

        case ALL_EMPLOYEES_FAIL:
        case ADMIN_EMPLOYEES_FAIL:
            return { 
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return { 
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const employeeDetailsReducer = (state = {employee: {}}, action ) => {
    switch(action.type) {
        
        case EMPLOYEE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case EMPLOYEE_DETAILS_SUCCESS:
            return {
                loading: false,
                employee: action.payload

            }
        case EMPLOYEE_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        
        default:
            return state
    }
}

export const employeeReducer = (state = {}, action ) => {
    switch(action.type) {
        
        case DELETE_EMPLOYEE_REQUEST:
        case UPDATE_EMPLOYEE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case UPDATE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case DELETE_EMPLOYEE_FAIL:
        case UPDATE_EMPLOYEE_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case DELETE_EMPLOYEE_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case UPDATE_EMPLOYEE_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        
        default:
            return state
    }
}

export const newEmployeeReducer = (state = { employee: {}}, action ) => {
    switch(action.type) {
        
        case NEW_EMPLOYEE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NEW_EMPLOYEE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                employee: action.payload.employee

            }
        case NEW_EMPLOYEE_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case NEW_EMPLOYEE_RESET:
            return {
                ...state,
                success: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        
        default:
            return state
    }
}

export const newCommentReducer = (state = {}, action ) => {
    switch(action.type) {
        
        case NEW_COMMENT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NEW_COMMENT_SUCCESS:
            return {
                loading: false,
                success: action.payload

            }
        case NEW_COMMENT_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case NEW_COMMENT_RESET:
            return {
                ...state,
                success: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        
        default:
            return state
    }
}

// Get all the comments
export const employeeCommentsReducer = (state = {comment: []}, action ) => {
    switch(action.type) {
        
        case GET_COMMENTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_COMMENTS_SUCCESS:
            return {
                loading: false,
                comments: action.payload

            }
        case GET_COMMENTS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        
        default:
            return state
    }
}

// Delete comment
export const commentReducer = (state = {}, action ) => {
    switch(action.type) {
        
        case DELETE_COMMENT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case DELETE_COMMENT_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case DELETE_COMMENT_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        
        default:
            return state
    }
}

// Update comment
export const updateCommentReducer = (state = {}, action ) => {
    switch(action.type) {
        
        case UPDATE_COMMENT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_COMMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case UPDATE_COMMENT_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case UPDATE_COMMENT_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        
        default:
            return state
    }
}