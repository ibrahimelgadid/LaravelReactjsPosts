import React, { Component } from 'react';
import {Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types'

export class Profile extends Component {


    render() {
        
        const { user} = this.props.auth;
        return (
            <div className="row justify-content-center">
                <div className="col-10 my-4">
                    <div className='card text-center'>
                        <div className="card-header">
                            {user.name} <Link to={`/image/edit/${user.id}`} className="float-right btn btn-sm btn-primary">Edit Image</Link>
                        </div>
                        <div className="card-body">
                            <img style={{width:200, height:200, borderRadius:200}}
                            src={user.userAvatar == null ?'images/noimage.png':user.userAvatar} alt=""/>
                            <p><strong>Id: </strong>{user.id}</p>
                            <p><strong>Name: </strong>{user.name}</p>
                            <p><strong>Email: </strong>{user.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Profile.propTypes = {
    auth:PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    auth:state.auth,
})

export default connect(mapStateToProps)(Profile)