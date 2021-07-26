import axios from 'axios';

import { ALL_EMPLOYEES_REQUEST, 
    ALL_EMPLOYEES_SUCCESS, 
    ALL_EMPLOYEES_FAIL, 
    ADMIN_EMPLOYEES_REQUEST, 
    ADMIN_EMPLOYEES_SUCCESS, 
    ADMIN_EMPLOYEES_FAIL, 
    EMPLOYEE_DETAILS_REQUEST, 
    EMPLOYEE_DETAILS_SUCCESS, 
    EMPLOYEE_DETAILS_FAIL,
    DELETE_EMPLOYEE_REQUEST,
    DELETE_EMPLOYEE_SUCCESS,
    DELETE_EMPLOYEE_FAIL,
    UPDATE_EMPLOYEE_REQUEST,
    UPDATE_EMPLOYEE_SUCCESS,
    UPDATE_EMPLOYEE_FAIL,
    NEW_COMMENT_REQUEST,
    NEW_COMMENT_SUCCESS,
    NEW_COMMENT_FAIL,
    GET_COMMENTS_REQUEST,
    GET_COMMENTS_SUCCESS,
    GET_COMMENTS_FAIL,
    NEW_EMPLOYEE_REQUEST,
    NEW_EMPLOYEE_SUCCESS,
    NEW_EMPLOYEE_FAIL,
    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_RESET,
    DELETE_COMMENT_FAIL,
    UPDATE_COMMENT_REQUEST,
    UPDATE_COMMENT_SUCCESS,
    UPDATE_COMMENT_FAIL,
    UPDATE_COMMENT_RESET,
    CLEAR_ERRORS } from '../constants/employeeConstants'

// Get all employees -> hit 'get' request
export const getEmployees = (keyword = '', currentPage = 1, department) => async (dispatch) => {
    try {
        dispatch({ type: ALL_EMPLOYEES_REQUEST })

        let link = `/api/v1/employees?keyword=${keyword}&page=${currentPage}`

        if (department) {
            link = `/api/v1/employees?keyword=${keyword}&page=${currentPage}&department=${department}`
        }

        const { data } = await axios.get(link)

        dispatch({ 
            type: ALL_EMPLOYEES_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_EMPLOYEES_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getEmployeeDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: EMPLOYEE_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/employee/${id}`)

        dispatch({ 
            type: EMPLOYEE_DETAILS_SUCCESS,
            payload: data.employee
        })
    } catch (error) {
        dispatch({
            type: EMPLOYEE_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete employee
export const deleteEmployee = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_EMPLOYEE_REQUEST })


        const { data } = await axios.delete(`/api/v1/admin/employee/${id}`)

        dispatch({ 
            type: DELETE_EMPLOYEE_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_EMPLOYEE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get admin employees
export const getAdminEmployees = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_EMPLOYEES_REQUEST })

        const { data } = await axios.get(`/api/v1/admin/employees`)

        dispatch({ 
            type: ADMIN_EMPLOYEES_SUCCESS,
            payload: data.employees
        })
    } catch (error) {
        dispatch({
            type: ADMIN_EMPLOYEES_FAIL,
            payload: error.response.data.message
        })
    }
}

// New comment
export const newComment = (commentData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_COMMENT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/comment`, commentData, config)

        dispatch({ 
            type: NEW_COMMENT_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: NEW_COMMENT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get employee comments
export const getEmployeeComments = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_COMMENTS_REQUEST })

        const { data } = await axios.get(`/api/v1/comments?id=${id}`)

        dispatch({ 
            type: GET_COMMENTS_SUCCESS,
            payload: data.comments
        })
    } catch (error) {
        dispatch({
            type: GET_COMMENTS_FAIL,
            payload: error.response.data.message
        })
    }
}

// New employee
export const newEmployee = (employeeData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_EMPLOYEE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/admin/employee/new`, employeeData, config)

        dispatch({ 
            type: NEW_EMPLOYEE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: NEW_EMPLOYEE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Employee (ADMIN)
export const updateEmployee = (id, employeeData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_EMPLOYEE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/employee/${id}`, employeeData, config)

        dispatch({ 
            type: UPDATE_EMPLOYEE_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_EMPLOYEE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete employee comment
export const deleteComment = (id, employeeId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_COMMENT_REQUEST })

        const { data } = await axios.delete(`/api/v1/comments?employeeId=${employeeId}&id=${id}`)

        dispatch({ 
            type: DELETE_COMMENT_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_COMMENT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update employee comment
export const updateComment = (id) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_COMMENT_REQUEST })

        const { data } = await axios.put(`/api/v1/comment/update?id=${id}`)

        dispatch({ 
            type: UPDATE_COMMENT_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_COMMENT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}