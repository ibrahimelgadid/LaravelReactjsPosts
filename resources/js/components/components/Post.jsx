import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export class Post extends Component {


  render() {
    let {post,deletePostHandler }= this.props;
    
    return (
      <div className="col-md-4 my-4" > 
        <div className="card">
          <div className="card-header">
            <img style={{width:30, height:30, borderRadius:15}}
              src={post.image == null ?'images/noimage.png':post.image} alt=""/>
            {' '}{post.user.name}
          </div>
          <div className="card-body">
            <p>{post.body}</p>
          {post.image?( <img 
              className=' img-fluid mb-4 d-block'
              style={{width:200, height:200}} 
              src={post.image} alt=""/>):null}
            <small className='text-muted'>
              Publisher: <strong>{post.user.name}</strong>{' '}
              at: <strong>{post.created_at}</strong>
            </small>
          </div>
          <div className="actions mb-2">
            <button onClick={deletePostHandler} className='btn btn-sm btn-danger mr-1 '>
              Delete
            </button>
            <Link to={`/editpost/${post.id}`} className='btn btn-sm btn-info text-white'>
              Edit
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Post
