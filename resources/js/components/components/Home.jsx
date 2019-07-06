import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'

export class Home extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    componentDidMount() {
        if(this.props.auth.isAuthenicated){
            this.props.history.push('/posts');
        }
    }
    
    render() {
        return (
            <div className="dark-overlay text-center ">
                <div className="action " style={{backgroundImage:'url(05.jpg)', height:'100vh'}}>
                    <h4 className='text-light pt-4'>To Our Website...</h4>
                    <Link to='/register' className="btn btn-primary mr-2">Register</Link>
                    <Link to='/login' className="btn btn-success">Login</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth:state.auth
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
