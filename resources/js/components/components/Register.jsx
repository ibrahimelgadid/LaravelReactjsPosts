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
        password_confirmation:'',
        errors:{},
    }

    Change = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    userRegister = (e) =>{
        e.preventDefault();
        const {name, email, password, password_confirmation} = this.state;

        const newUser={
            name:name,
            email:email,
            password:password,
            password_confirmation:password_confirmation
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
    
    componentDidMount() {
        if(this.props.auth.isAuthenicated){
            this.props.history.push('/posts');
        }
    }

    render() {
        
        const { name, email, password, password_confirmation,errors} = this.state;
        
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
                                                {errors.name?(<div className="invalid-feedback">{errors.name[0]}</div>):null}
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
                                                {errors.email?(<div className="invalid-feedback">{errors.email[0]}</div>):null}
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
                                                {errors.password?(<div className="invalid-feedback">{errors.password[0]}</div>):null}
                                            </div>

                                            <div className="form-group">
                                                <input 
                                                    type="password" 
                                                    name='password_confirmation'
                                                    className='form-control'
                                                    placeholder='Confirm your password'
                                                    value={password_confirmation}
                                                    onChange={this.Change}
                                                />
                                            </div>

                                            <input type="submit" value='Register' className="btn btn-info btn-block mt-4 text-white" />
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
