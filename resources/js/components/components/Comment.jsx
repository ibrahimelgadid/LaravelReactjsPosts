import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

export class Comment extends Component {
    render() {

        let {comment} = this.props;
        let { deleteCommentHandler } = this.props;
        let {user} = this.props.auth;


        return (
            <div className='my-2'>
                <img style={{width:25, height:25, borderRadius:25}} 
                src={comment.user.userAvatar == null ?'images/noimage.png':comment.user.userAvatar} alt=""/>

                {comment.body}
                {comment.user_id === user.id ?
                (<span className="actions float-right">
                    <span style={{cursor:'pointer'}} onClick={deleteCommentHandler} className='text-danger mr-1 '>
                        Delete
                    </span>
                </span>)
                :null}
            </div>
        )
    }
}

Comment.propTypes = {
    auth:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth:state.auth
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
