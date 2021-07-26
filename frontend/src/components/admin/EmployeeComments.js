import React, { Fragment, useState, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployeeComments, deleteComment, clearErrors } from '../../actions/employeeActions'
import { DELETE_COMMENT_RESET } from '../../constants/employeeConstants'

const EmployeeComments = () => {

    const [employeeId, setEmployeeId] = useState('')
    

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, comments } = useSelector(state => state.employeeComments);
    const { isDeleted } = useSelector(state => state.comment);

    useEffect(() => {
        //dispatch(employeeComments());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if(employeeId !== ''){
            dispatch(getEmployeeComments(employeeId))
        }

        if (isDeleted) {
            alert.success('Comment deleted successfully');
            dispatch({ type: DELETE_COMMENT_RESET })
        }


    }, [dispatch, alert, error, employeeId, isDeleted])

    const deleteCommentHandler = (id) => {
        dispatch(deleteComment(id, employeeId))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getEmployeeComments(employeeId))
    }

    const setComments = () => {
        const data = {
            columns: [
                {
                    label: 'Comment ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'Created At',
                    field: 'created',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        comments.forEach(comment => {
            data.rows.push({
                id: comment._id,
                user: comment.name,
                comment: comment.comment,
                created: String(comment.created).substring(0, 10),

                actions: 
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => 
                        deleteCommentHandler(comment._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
            })
        })

        return data;
    }

    return (
        <Fragment>
            <MetaData title={'Employee Comments'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                    <div className="row justify-content-center mt-5">
                    <div className="col-5">
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <label htmlFor="employeeId_field">Enter Employee ID</label>
                            <input
                                type="text"
                                id="employeeId_field"
                                className="form-control"
                                value={employeeId}
                                onChange={(e) => setEmployeeId(e.target.value)}
                            />
                        </div>

                        <button
                            id="search_button"
                            type="submit"
                            className="btn btn-primary btn-block py-2"
                        >
                            SEARCH
                        </button>
                        </ form>
                    </div>
                </div>

                {comments && comments.length > 0 ? (

                    <MDBDataTable
                        data={setComments()}
                        className="px-3"
                        bordered
                        striped
                        hover
                    />
                    
                ) : (
                    <p className="mt-5 text-center">No comments</p>
                )}

            </Fragment>
        </div>
    </div>

    </Fragment>
    )
}

export default EmployeeComments
