import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import classnames from "classnames";
import { addComment, deleteComment } from "../actions/postActions";
import Comment from './Comment'

export class Post extends Component {

    state = {
      body:'',
      errors:{}
    }

    onChange = (e)=> {
          this.setState({
              [e.target.name]:e.target.value
          })
    }

    CommentSubmit = (e) => {
      e.preventDefault();
      const { body} = this.state;
      const {id} = this.props.post;

      let newComment = {
        body:body,
        posts_id:id
      }
      this.props.addComment(newComment);
      this.setState({ body:'' });
  
  }

  componentWillReceiveProps(nextProps) {
      if(nextProps.errors.errors){
          this.setState({
              errors:nextProps.errors.errors
          })
      }
  }

    render() {
      let {post,deletePostHandler }= this.props;
      let {user} = this.props.auth;
      let {errors, body}=this.state;
      
      let commentShow;

      if(post.comments.length ===0){
        commentShow = <div className="text-primary">No comments yet</div>
    } else {
        commentShow = post.comments.map(
            comment=><Comment 
                    key={comment.id} 
                    comment={comment}
                    deleteCommentHandler={this.props.deleteComment.bind(this,comment.id)}
                />
            )
    }
      
      return (
        <div className="col-md-8 col-10 my-4" > 
          <div className="card border-info">

            <div className="card-header bg-info text-white">
              <img style={{width:30, height:30, borderRadius:15}}
                src={post.user.userAvatar == null ?'images/noimage.png':post.user.userAvatar} alt=""/>
              {' '}{post.user.name}
            </div>

              {post.image?( <img 
                className='card-img-top mb-4 '
                src={post.image} alt=""/>):null}

            <div className="card-body">
              <p className='card-text'>{post.body}</p>
              <small className='text-muted'>
                Publisher: <strong>{post.user.name}</strong>{' '}
                at: <strong>{post.created_at}</strong>
              </small>
              {post.user.id === user.id ?
                (<div className="actions mb-2">
                  <button onClick={deletePostHandler} className='btn btn-sm btn-danger mr-1 '>
                    Delete
                  </button>
                  <Link to={`/editpost/${post.id}`} className='btn btn-sm btn-info text-white'>
                    Edit
                  </Link>
                </div>)
                :null}
            </div>

            <div className="card-footer">
              <strong>Comments</strong>
                <div>
                  <form onSubmit={this.CommentSubmit}>
                    <div className="form-group">
                      <textarea 
                        name="body" 
                        className='form-control' 
                        placeholder='let your comment'
                        value={body}
                        onChange={this.onChange}
                        className={classnames('form-control', {'is-invalid':errors.body})}
                      ></textarea>
                      {errors.body?(<div className="invalid-feedback">{errors.body}</div>):null}
                    </div>
                    <input type='submit' className="btn btn-sm btn-success " value='Comment'/>
                  </form>
                </div>

              <div className="comment ml-4">
                {commentShow}
              </div>
            </div>
          </div>

        </div>
      )
    }
  }

  Post.propTypes = {
    auth :PropTypes.object.isRequired,
    addComment :PropTypes.func.isRequired,
    errors:PropTypes.object,
    deletePostHandler:PropTypes.func.isRequired,
    deleteComment:PropTypes.func.isRequired
  }

const mapStateToProps = (state) => ({
  auth:state.auth,
  errors:state.errors
})

const mapDispatchToProps = {
  addComment:addComment,
  deleteComment:deleteComment
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
