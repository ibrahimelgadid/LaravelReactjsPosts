import React, { Component } from 'react';
import classnames from "classnames";
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { addPost } from "../actions/postActions";
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';



export class AddPost extends Component {
    state = {
        body:'',
        postImage:'',
        errors:{}
    }

    onChange = (e)=> {
        switch (e.target.name) {
            case 'postImage':
                this.setState({
                postImage:e.target.files[0]
            })

            break;
        
            default:
            {this.setState({
                [e.target.name]:e.target.value
            })}
        }
    }


    PostSubmit = (e) => {
        e.preventDefault();
        const { body, postImage } = this.state;

        let newPost = new FormData();
        newPost.append('body', body);
        newPost.append('postImage', postImage)
        
        this.setState({ body:'' });
    
        this.props.addPost(newPost, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors.errors){
            this.setState({
                errors:nextProps.errors.errors
            })
        }
    }
    
    

    render() {
        
        const {body, errors}= this.state;

        return (
            <div>
                <div className="row">
                    <div className="col-10 col-md-6 m-auto">
                        <div className="card my-4">
                            <div className="card-header">
                                <h5 className="text-muted text-center">Add New Post</h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.PostSubmit} encType="multipart/form-data">

                                    <div className="from-group mb-2">
                                        <textarea 
                                            name="body" 
                                            placeholder="Enter your post" 
                                            value={body}
                                            onChange={this.onChange}
                                            className={classnames('form-control', {'is-invalid':errors.body})}
                                        ></textarea>
                                        {errors.body?(<div className="invalid-feedback">{errors.body}</div>):null}
                                    </div>

                                    <div className="input-group">
                                        <div className="custom-file">
                                            <input
                                                name='postImage' 
                                                type="file" 
                                                className={classnames("custom-file-input", {'is-invalid':errors.postImage})} 
                                                id="inputGroupFile01"
                                                onChange={this.onChange}
                                            />
                                            <label className="custom-file-label" htmlFor="inputGroupFile01">Choose image (optional)</label>
                                        </div>
                                    </div>
                                        {errors.postImage?(<small className="text-danger">{errors.postImage}</small>):null}

                                    <div className="form-group mt-3">
                                        <Link to='/posts' className="btn btn-sm btn-secondary">
                                            <i className="fa fa-arrow-left m-2"></i>
                                            Go Back
                                        </Link>
                                        <input type='submit' value='Add' className="btn btn-success btn-sm" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddPost.propTypes={
    errors:PropTypes.object,
    post:PropTypes.object.isRequired,
    addPost:PropTypes.func.isRequired,
}

const mapStateToProps = state =>({
    post: state.post,
    errors: state.errors
})
 
export default connect(mapStateToProps,
    {addPost}
    )(withRouter(AddPost));