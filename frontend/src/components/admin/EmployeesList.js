import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminEmployees, deleteEmployee, clearErrors } from '../../actions/employeeActions'
import { DELETE_EMPLOYEE_RESET } from '../../constants/employeeConstants'

const EmployeesList = ({ history }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, employees } = useSelector(state => state.employees);
    const { error: deleteError, isDeleted } = useSelector(state => state.employee);

    useEffect(() => {
        dispatch(getAdminEmployees());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }
        if(isDeleted){
            alert.success('Employee deleted successfully');
            history.push('/admin/employees');
            dispatch({ type: DELETE_EMPLOYEE_RESET })
        }

    }, [dispatch, alert, error, deleteError, isDeleted, history])

    const setEmployees = () => {
        const data = {
            columns: [
                {
                    label: 'Date of Joining',
                    field: 'joining',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'title',
                    sort: 'asc'
                },
                {
                    label: 'Salary',
                    field: 'salary',
                    sort: 'asc'
                },
                {
                    label: 'Department',
                    field: 'department',
                    sort: 'asc'
                },
                {
                    label: 'Manager',
                    field: 'manager',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions'
                },
            ],
            rows: []
        }

        employees.forEach(employee => {
            data.rows.push({
                joining: String(employee.joining).substring(0, 10),
                name: employee.name,
                title: employee.title,
                salary: `$${employee.salary && employee.salary[0] && employee.salary[0].amount}`,
                department: employee.department,
                manager: employee.manager,
                actions:<Fragment>
                    <Link to={`/admin/employee/${employee._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" 
                    onClick={() => deleteEmployeeHandler(employee._id)}>
                    <i className="fa fa-trash"></i>
                    </button>
                    </Fragment>
            })
        })

        return data;
    }

    const deleteEmployeeHandler = (id) => {
        dispatch(deleteEmployee(id))
    }
    return (
        <Fragment>
            <MetaData title = {'All Employees'}/>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Employees</h1>
                        {loading ? <Loader/> : (
                            <MDBDataTable
                            data={setEmployees()}
                            className="px-3"
                            bordered
                            striped
                            hover
                        />
                        ) }
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}

export default EmployeesList

