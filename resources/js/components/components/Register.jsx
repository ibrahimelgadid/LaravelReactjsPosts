import React, { Component } from 'react';
import classnames from 'classnames';
import { withRouter } from "react-router-dom";
import { registerUser } from "../actions/authAction";
import { connect } from "react-redux";
import PropTypes from 'prop-types'

export class Register extends Component {

    state = { 
        name : '',
        email:'',
        password:'',
        password2:'',
        errors:{},
    }

    Change = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    userRegister = (e) =>{
        e.preventDefault();
        const {name, email, password, password2} = this.state;

        const newUser={
            name:name,
            email:email,
            password:password,
            password2:password2
        }

        this.props.registerUser(newUser, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors.errors){
            this.setState({
                errors:nextProps.errors.errors
            })
        }
    }
    


    render() {
        
        const { name, email, password, password2,errors} = this.state;
        
        return (
            <div>
                <div className="register">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-8 m-auto ">
                                <div className="card mt-4">
                                    <h3 className="card-header">Register</h3>
                                    <div className="card-body">
                                        <form onSubmit={this.userRegister}>
                                            <div className="form-group">
                                                <input 
                                                    type="text" 
                                                    name='name'
                                                    className={classnames('form-control', {'is-invalid':errors.name})}
                                                    placeholder='Insert your name'
                                                    value={name}
                                                    onChange={this.Change}
                                                />
                                                {errors.name?(<div className="invalid-feedback">{errors.name}</div>):null}
                                            </div>

                                            <div className="form-group">
                                                <input 
                                                    type="email" 
                                                    name='email'
                                                    className={classnames('form-control', {'is-invalid':errors.email})}
                                                    placeholder='Insert your email'
                                                    value={email}
                                                    onChange={this.Change}
                                                />
                                                {errors.email?(<div className="invalid-feedback">{errors.email}</div>):null}
                                            </div>

                                            <div className="form-group">
                                                <input 
                                                    type="password" 
                                                    name='password'
                                                    className={classnames('form-control', {'is-invalid':errors.password})}
                                                    placeholder='Insert your password'
                                                    value={password}
                                                    onChange={this.Change}
                                                />
                                                {errors.password?(<div className="invalid-feedback">{errors.password}</div>):null}
                                            </div>

                                            <div className="form-group">
                                                <input 
                                                    type="password" 
                                                    name='password2'
                                                    className={classnames('form-control', {'is-invalid':errors.password2})}
                                                    placeholder='Confirm your password'
                                                    value={password2}
                                                    onChange={this.Change}
                                                />
                                                {errors.password2?(<div className="invalid-feedback">{errors.password2}</div>):null}
                                            </div>

                                            <input type="submit" value='Register' className="btn btn-info btn-block mt-4" />
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

Register.propTypes = {
    errors:PropTypes.object,
    auth:PropTypes.object.isRequired,
    registerUser:PropTypes.func.isRequired,
}

const mapStateToProps = state =>({
    auth:state.auth,
    errors:state.errors
})

export default connect(mapStateToProps, {registerUser})(withRouter(Register))
