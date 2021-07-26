import React, { Fragment, useState, useEffect } from 'react'
import MetaData from './layout/MetaData'
import Employee from './employee/Employee'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';

import { useDispatch, useSelector } from 'react-redux'
import { getEmployees } from '../actions/employeeActions'
import Loader from './layout/Loader'
import { useAlert } from 'react-alert';


const Home = ({ match }) => {

    const [ currentPage, setCurrentPage ] = useState(1)
    const [ department, setDepartment ] = useState('')

    const departments = [ 
        'Management',
        'Human Resources',
        'Engineering',
        'Sales',
        'Product',
        'Operations',
        'Marketing',
        'Design',
        'Customer Success'
    ]

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, employees, error, employeeCount, 
        resPerPage, filteredEmployeesCount } = useSelector(state => state.employees)

    const keyword = match.params.keyword

    useEffect(() => {
        if(error){
            return alert.error(error);
        }
        dispatch(getEmployees(keyword, currentPage, department));
    }, [dispatch, alert, error, keyword, currentPage, department])

    function setCurrentpageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let count = employeeCount;
    if(keyword) {
        count = filteredEmployeesCount
    }

    return (
        <Fragment>
            {loading ? <Loader /> :(
                <Fragment>
                    <MetaData title={'GradPlus'}/>

                    <h1 id="employees_heading">Employees here!</h1>

                    <section id="employees" className="container mt-5">
                    <div className="row">
                    {keyword ? (
                                <Fragment>
                                    <div className="col-6 col-md-3 mt-5 mb-5">
                                    <div className="px-5">
                                    <hr className="my-5" />

                                        <div className="mt-5">
                                            <h4 className="mb-3">
                                                Departments
                                            </h4>
                                            

                                            <ul className="pl-0">
                                                {departments.map(department => (
                                                    <li
                                                        style={{
                                                            cursor: 'pointer',
                                                            listStyleType: 'none'
                                                        }}
                                                        key={department}
                                                        onClick={() => setDepartment(department)}
                                                    >
                                                        {department}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        </div>
                                    </div>
                                        <div className="col-6 col-md-9">
                                        <div className="row">
                                            {employees.map(employee => (
                                                <Employee key={employee._id} employee={employee} col={4} />
                                            ))}
                                        </div>
                                    
                                </div>
                                </Fragment>
                            ) : (
                                    employees.map(employee => (
                                        <Employee key = {employee._id} employee = {employee} col={3} />
                                        
                                    ))
                                )}
                        </div>
                    </section>
                    {resPerPage <= count && (
                        <div className="d-flex justify-content-center mt-5">
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resPerPage}
                            totalItemsCount={employeeCount}
                            onChange={setCurrentpageNo}
                            nextPageText={'Next'}
                            previousPageText={'Prev'}
                            firstPageText={'First'}
                            lastPageText={'Last'}
                            itemClass="page-item"
                            linkClass="page-link"
                        />
                    </div>
                    )}
                </Fragment>
            )}
    </Fragment>        
    )
}

export default Home