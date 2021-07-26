import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateEmployee, getEmployeeDetails, clearErrors } from '../../actions/employeeActions'

import { UPDATE_EMPLOYEE_RESET } from '../../constants/employeeConstants'

const UpdateEmployee = ({ match, history }) => {

    const [ name, setName ] = useState('');
    const [ amount, setAmount] = useState(0);
    const [ payment, setPayment] = useState('');
    const [ title, setTitle ] = useState('');
    const [ department, setDepartment ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ joining, setJoining ] = useState('');
    const [ manager, setManager ] = useState('');
    const [ avatars, setAvatars ] = useState([]);
    const [ oldAvatars, setOldAvatars ] = useState([]);
    const [ avatarsPreview, setAvatarsPreview ] = useState([]);

    const payments = [
        'N/A',
        'Annual',
        'Monthly'
    ]
    const departments = [ 
        'N/A',
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

    const { error, employee } = useSelector(state => state.employeeDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.employee);

    const employeeId = match.params.id;

    useEffect(() => {

        if(employee && employee._id !== employeeId) {
            dispatch(getEmployeeDetails(employeeId));
        } else {
            setName(employee.name);
            setTitle(employee.title);
            setAmount(employee.salary[0].amount);
            setPayment(employee.salary[0].payment);
            setManager(employee.manager);
            setDepartment(employee.department);
            setJoining(String(employee.joining).substring(0, 10));
            setAddress(employee.address);
            setOldAvatars(employee.avatars);

        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors())
        }

        if(isUpdated) {
            history.push('/admin/employees');
            alert.success('Employee updated successfully');
            dispatch({ type: UPDATE_EMPLOYEE_RESET })
        }
    }, [dispatch, alert, error, isUpdated, history, updateError, employee, employeeId])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('title', title);
        formData.set('joining', joining);
        //formData.set('salary', salary);
        formData.set('amount', amount);
        formData.set('payment', payment);
        formData.set('department', department);
        formData.set('manager', manager);
        formData.set('address', address);

        avatars.forEach(avatar => {
            formData.append('avatars', avatar)
        })

        dispatch(updateEmployee(employee._id, formData))
    }

    const onChange = e => {

        const files = Array.from(e.target.files)
        
        setAvatarsPreview([]);
        setAvatars([]);
        setOldAvatars([]);

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState === 2) {
                    setAvatarsPreview(oldArray => [...oldArray, reader.result])
                    setAvatars(oldArray => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }

    return (
        <Fragment>
            <MetaData title = {'Update Employee'}/>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                            <div className="wrapper my-5"> 
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">Update Employee</h1>

                                <div className="form-group">
                                <label htmlFor="name_field">Name</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) =>setName(e.target.value)}
                                />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Title</label>
                                    <textarea className="form-control" 
                                    id="description_field" 
                                    rows="2" 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}>
                                    </textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="amount_field">Salary Amount</label>
                                    <input
                                    type="Number"
                                    id="amount_field"
                                    className="form-control"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="payment_field">Payment Type</label>
                                    <select className="form-control" id="payment_field"
                                    value={payment}
                                    onChange={(e) => setPayment(e.target.value)}>
                                        {payments.map(payment =>(
                                            <option key={payment} value={payment}>{payment}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Department</label>
                                    <select className="form-control" id="category_field"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}>
                                        {departments.map(department =>(
                                            <option key={department} value={department}>{department}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Address</label>
                                    <textarea className="form-control" 
                                    id="description_field" 
                                    rows="3" 
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}>
                                    </textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="stock_field">Joining</label>
                                    <input
                                    type="date"
                                    id="stock_field"
                                    className="form-control"
                                    value={joining}
                                    onChange={(e) => setJoining(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="seller_field">Manager</label>
                                    <input
                                    type="text"
                                    id="seller_field"
                                    className="form-control"
                                    value={manager}
                                    onChange={(e) =>setManager(e.target.value)}
                                    />
                                </div>
                                
                                <div className='form-group'>
                                    <label>Avatars</label>
                                    
                                        <div className='custom-file'>
                                            <input
                                                type='file'
                                                name='product_images'
                                                className='custom-file-input'
                                                id='customFile'
                                                onChange={onChange}
                                                multiple
                                            />
                                            <label className='custom-file-label' htmlFor='customFile'>
                                                Choose Images
                                            </label>
                                        </div>
                                        {oldAvatars && oldAvatars.map(img => (
                                            <img key = {img} src={img.url} alt={img.url} 
                                            className="mt-3 mr-2" width="55" height="52"/>
                                        ))}
                                        {avatarsPreview.map(img => (
                                            <img src={img} key={img} alt="" className="mt-3 mr-2" 
                                            width="55" height="52" />
                                        ))}
                                </div>

                    
                                <button
                                id="login_button"
                                type="submit"
                                className="btn btn-block py-3"
                                disabled = { loading ? true : false}
                                >
                                UPDATE
                                </button>

                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdateEmployee
