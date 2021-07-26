import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="sidebar-wrapper">
                <nav id="sidebar">
                    <ul className="list-unstyled components">
                    <li>
                        <Link to="/dashboard"><i className="fa fa-tachometer"></i> Dashboard</Link>
                    </li>
            
                    <li>
                        <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" 
                        className="dropdown-toggle"><i
                            className="fa fa-address-card"></i> Employees</a>
                        <ul className="collapse list-unstyled" id="productSubmenu">
                            <li>
                            <Link to="/admin/employees"><i className="fa fa-clipboard"></i> All</Link>
                            </li>
            
                            <li>
                            <Link to="/admin/employee"><i className="fa fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/admin/comments"><i className="fa fa-comments"></i> Comments</Link>
                    </li>
                </ul>
                </nav>
            </div>
    )
}

export default Sidebar
