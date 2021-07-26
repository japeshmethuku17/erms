import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployeeDetails, deleteComment } from '../../actions/employeeActions'

const ListComments = ({ comments }) => {
    const { user, loading } =useSelector(state => state.auth)
    const { employee } = useSelector(state => state.employeeDetails)
    const dispatch = useDispatch();

    const deleteCommentHandler = (id) => {
        dispatch(deleteComment(id, employee._id))
    }



    return (
        <div class="comments w-50">
            <h3>Comments:</h3>
            <hr />
            {comments && comments.map(anyComment => (
                <div key={anyComment._id} class="review-card my-3">
                <p class="review_comment">Commented by: {anyComment.name}</p>
                <p class="review_comment">Commented at: {String(anyComment.created).substring(0, 10)}</p>
                <p class="review_comment">Comment: {anyComment.comment}</p>
                {(!loading && anyComment.user == user._id) && (
                    <Fragment>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => 
                        deleteCommentHandler(anyComment._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                    </Fragment>
                )}
                

                <hr />
            </div>
            ))}
                
        </div>
    )
}

export default ListComments
