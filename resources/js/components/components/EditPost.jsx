import React, { Component } from 'react';
import { Link, withRouter, Redirect } from "react-router-dom";
import classnames from 'classnames';
import { getPost, editPost } from "../actions/postActions";
import { connect } from "react-redux";
import PropTypes from 'prop-types'


export class EditPost extends Component {
    state={
        body:'',
        postImage:'',
        oldImage:'',
        notOwner:'',
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


    PostEdit = (e) => {
        e.preventDefault();
        const { body, postImage } = this.state;
        const { id } = this.props.match.params;

        let newPost = new FormData();
        newPost.append('body', body);
        newPost.append('postImage', postImage)
        newPost.append('_method', 'PUT');


        this.props.editPost(newPost, id,this.props.history);
        
    }


    componentDidMount() {
        const {id} = this.props.match.params;
        if(!this.props.auth.user.id == id){
            <Redirect to="/posts"/>
        }
        this.props.getPost(id)
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.post){
            this.setState({
                body:nextProps.post.post.body
            })
        }

        if(nextProps.errors.errors){
            this.setState({
                errors:nextProps.errors.errors
            })
        }

        if(nextProps.errors.notOwner){
            this.setState({
                notOwner:nextProps.errors.notOwner
            })
        }
    }
    
    

    render() {

        const {body, errors, oldImage, notOwner}= this.state;

        return (
            <div>
                <div className='text-center'>
                    {notOwner?
                    (<div className='text-danger'>
                        {notOwner}
                    </div>):null}
                </div>
                <div className="row">
                    <div className="col-10 col-md-6 m-auto">
                        <div className="card my-4">
                            <div className="card-header">
                                <h5 className="text-muted text-center">Edit Post</h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.PostEdit} encType="multipart/form-data">

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
                                        <input type="hidden" name="oldImage" value={oldImage}/>
                                        <Link to='/posts' className="btn btn-sm btn-secondary">
                                            <i className="fa fa-arrow-left m-2"></i>
                                            Go Back
                                        </Link>
                                        <input type='submit' value='Edit' className="btn btn-success btn-sm" />
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

EditPost.propTypes = {
    errors:PropTypes.object,
    post:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired,
    getPost:PropTypes.func.isRequired,
    editPost:PropTypes.func.isRequired
}

const mapStateToProps = state =>({
    post:state.post,
    errors:state.errors,
    auth:state.auth
})

export default connect(mapStateToProps, {getPost,editPost})(withRouter(EditPost))
