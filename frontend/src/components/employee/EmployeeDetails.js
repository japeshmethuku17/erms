import React, { Fragment, useState, useEffect } from 'react'
import { Carousel } from 'react-bootstrap'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import ListComments from '../comment/ListComments'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployeeDetails, newComment, clearErrors } from '../../actions/employeeActions'

import Employee from './Employee'

import { NEW_COMMENT_RESET } from '../../constants/employeeConstants'


const EmployeeDetails = ({ match }) => {

    const [ comment, setComment ] = useState('');

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, employee } = useSelector(state => state.employeeDetails)
    const { user } = useSelector(state => state.auth)
    const { error: commentError, success } = useSelector(state => state.newComment)
    useEffect(() =>{

        dispatch(getEmployeeDetails(match.params.id))

        if(error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if(commentError) {
            alert.error(commentError);
            dispatch(clearErrors())
        }

        if(success) {
            alert.success('Comment posted successfully');
            dispatch({ type: NEW_COMMENT_RESET })
        }

    }, [dispatch, alert, error, commentError, match.params.id, success])

    const commentHandler = () => {
        const formData = new FormData();

        formData.set('comment', comment);
        formData.set('employeeId', match.params.id);

        dispatch(newComment(formData));
    }
    return (

        <Fragment>
        {loading ? <Loader /> : (
            <Fragment>
            <MetaData title = {employee.name} />
            <div className="row f-flex justify-content-around mt-5 user-info">
            <div className="col-12 col-lg-5" id="employee_image">
            
                    {employee.avatars && employee.avatars.map(image =>(
                        <img className="employee-profile" src={image.url} alt={employee.title}/>
                    ))}
                
            </div>

            <div className="col-12 col-lg-5 mt-5">
                <h3>{employee.name}</h3>
                <hr />
                <p className="mt-2"><strong>Role:</strong> {employee.title}</p>
                <p className="mt-2"><strong>Date of Joining: </strong> {String(employee.joining).substring(0, 10)}</p>
                <hr />
                <p className="mt-2"><strong>Department:</strong> {employee.department}</p>
                <p className="mt-2"><strong>Reports to:</strong> {employee.manager}</p>
                <hr />
                <p className="mt-2"><strong>Salary:</strong> ${employee.salary && employee.salary[0].amount}</p>
                <p className="mt-2"><strong>Payment type:</strong> {employee.salary && employee.salary[0].payment}</p>
                <hr />
                <p className="mt-2"><strong>Employee ID:</strong> {employee._id}</p>

                <hr />

                
            
                            {user ? <button id="comment_btn" type="button" className="btn btn-primary mt-4" 
                            data-toggle="modal" data-target="#ratingModal">
                                        Comment
                            </button>
                            :
                            <div className="alert alert-danger mt-5" type='alert'> Login to comment </div>
                            
                        }
				
				
				<div className="row mt-2 mb-5">
                    <div className="rating w-50">

                        <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="ratingModalLabel">Your comment</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">

                                        <textarea name="comment" 
                                        id="comment" 
                                        className="form-control mt-3"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}>

                                        </textarea>

                                        <button className="btn my-3 float-right comment-btn px-4 text-white" 
                                        onClick={commentHandler} data-dismiss="modal" 
                                        aria-label="Close">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>	
                    </div>
                </div>
            </div>
            <hr />
            {employee.comments && employee.comments.length > 0 && (
                <ListComments comments = {employee.comments} />
            )}
            </Fragment>
        )}

    </Fragment>
        
    )
}

export default EmployeeDetails
