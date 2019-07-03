import React, { Component } from 'react';
import classnames from 'classnames';
import {withRouter } from "react-router-dom";
import { loginUser } from "../actions/authAction";
import { connect } from "react-redux";
import PropTypes from 'prop-types'

export class Login extends Component {

    state = { 
        email:'',
        password:'',
        errors:{},
    }

    Change = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    userLogin = (e) =>{
        e.preventDefault();
        const {email, password} = this.state;

        const loginUser={
            email:email,
            password:password,
        }

        this.props.loginUser(loginUser, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors.errors){
            this.setState({
                errors:nextProps.errors.errors
            })
        }
    }
    


    render() {
        
        const { email, password,errors} = this.state;
        
        return (
            <div>
                <div className="Login">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-8 m-auto ">
                                <div className="card mt-4">
                                    <h3 className="card-header">Login</h3>
                                    <div className="card-body">
                                        <form onSubmit={this.userLogin}>

                                            <div className="form-group">
                                                <input 
                                                    type="email" 
                                                    name='email'
                                                    className={classnames('form-control', {'is-invalid':errors.emailOrPass})}
                                                    placeholder='Insert your email'
                                                    value={email}
                                                    onChange={this.Change}
                                                />
                                                {errors.emailOrPass?(<div className="invalid-feedback">{errors.emailOrPass}</div>):null}
                                            </div>

                                            <div className="form-group">
                                                <input 
                                                    type="password" 
                                                    name='password'
                                                    className={classnames('form-control', {'is-invalid':errors.emailOrPass})}
                                                    placeholder='Insert your password'
                                                    value={password}
                                                    onChange={this.Change}
                                                />
                                                {errors.emailOrPass?(<div className="invalid-feedback">{errors.emailOrPass}</div>):null}
                                            </div>

                                            <input type="submit" value='Login' className="btn btn-info btn-block mt-4 text-white" />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    errors:PropTypes.object,
    auth:PropTypes.object.isRequired,
    loginUser:PropTypes.func.isRequired,
}

const mapStateToProps = state =>({
    auth:state.auth,
    errors:state.errors
})

export default connect(mapStateToProps, {loginUser})(withRouter(Login))