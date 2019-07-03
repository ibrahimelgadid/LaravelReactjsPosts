import React, { Component } from 'react';
import {Link} from 'react-router-dom'

export class Home extends Component {
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

export default Home
