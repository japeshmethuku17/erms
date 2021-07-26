import React from 'react'
import { Link } from 'react-router-dom'

const Employee = ({ employee, col }) => {
    return (
        <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
                    <div className="card p-3 rounded">
                        <img
                        className="card-img-top mx-auto"
                        src= {employee.avatars[0].url}
                        />
                        <div className="card-body d-flex flex-column">
                        <h5 className="card-title">
                            <Link to={`/employee/${employee._id}`}>{employee.name}</Link>
                        </h5>
                        <p className="card-subtext">{employee.title}</p>
                        <Link to={`/employee/${employee._id}`} id="view_btn" className="btn btn-block">View Details</Link>
                        </div>
                    </div>
                    </div>
    )
}

export default Employee