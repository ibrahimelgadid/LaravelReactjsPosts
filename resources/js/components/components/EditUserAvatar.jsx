import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import classnames from 'classnames';
import { editAvatar } from "../actions/profileAction";
import { connect } from "react-redux";
import PropTypes from 'prop-types'


export class EditUserAvatar extends Component {
    state={
        userAvatar:'',
        oldAvatar:'',
        errors:{}
    }

    onChange = (e)=> {
        switch (e.target.name) {
            case 'userAvatar':
                this.setState({
                userAvatar:e.target.files[0]
            })

            break;
        
            default:
            {this.setState({
                [e.target.name]:e.target.value
            })}
        }
    }


    avatarEdit = (e) => {
        e.preventDefault();
        const { userAvatar } = this.state;
        const { id } = this.props.match.params;

        let avatar = new FormData();
        avatar.append('userAvatar', userAvatar)
        avatar.append('_method', 'PUT');


        this.props.editAvatar(id,avatar,this.props.history);
        
    }



    componentWillReceiveProps(nextProps) {
        if(nextProps.errors.errors){
            this.setState({
                errors:nextProps.errors.errors
            })
        }
    }
    
    

    render() {

        const {errors, oldAvatar}= this.state;

        return (
            <div>
                <div className='text-center'>
                </div>
                <div className="row">
                    <div className="col-10 col-md-6 m-auto">
                        <div className="card my-4">
                            <div className="card-header">
                                <h5 className="text-muted text-center">Edit Post</h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.avatarEdit} encType="multipart/form-data">


                                    <div className="input-group">
                                        <div className="custom-file">
                                            <input
                                                name='userAvatar' 
                                                type="file" 
                                                className={classnames("custom-file-input", {'is-invalid':errors.userAvatar})} 
                                                id="inputGroupFile01"
                                                onChange={this.onChange}
                                            />
                                            <label className="custom-file-label" htmlFor="inputGroupFile01">Choose image</label>
                                        </div>
                                    </div>
                                        {errors.userAvatar?(<small className="text-danger">{errors.userAvatar}</small>):null}

                                    <div className="form-group mt-3">
                                        <input type="hidden" name="oldImage" value={oldAvatar}/>
                                        <Link to='/profile' className="btn btn-sm btn-secondary">
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

EditUserAvatar.propTypes = {
    errors:PropTypes.object,
    auth:PropTypes.object.isRequired,
    editAvatar:PropTypes.func.isRequired
}

const mapStateToProps = state =>({
    auth:state.auth,
    errors:state.errors
})

export default connect(mapStateToProps, {editAvatar})(withRouter(EditUserAvatar))
