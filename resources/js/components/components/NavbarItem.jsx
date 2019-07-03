import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { logoutUser } from "../actions/authAction";
import { connect } from "react-redux";
import PropTypes from 'prop-types'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem } from 'reactstrap';

class NavbarItem extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false
    };

  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }



  render() {
    
    const {isAuthenicated, user} = this.props.auth;
    
    return (
      <div>
        <Navbar color="dark" dark expand="sm">
          <Link className='navbar-brand' to="/">reactstrap</Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            
            {isAuthenicated?(
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link to="/profile" className='nav-link'>
                  <img style={{width:25, height:25, borderRadius:15}}
                    src={user.userAvatar == null ?'images/noimage.png':user.userAvatar} alt=""/>
                  {' '}{user.name}
                  </Link>
                </NavItem>

                <NavItem>
                  <Link to="/posts" className='nav-link'>
                    Posts
                  </Link>
                </NavItem>

                <NavItem>
                  <Link to="/addpost" className='nav-link'>
                    Add Post
                  </Link>
                </NavItem>

                <NavItem>
                  <Link to="/login" onClick={this.props.logoutUser.bind(this,this.props.history)} className='nav-link'>
                    Logout
                  </Link>
                </NavItem>

              </Nav>
            ):(
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <Link to="/register" className='nav-link'>
                    Register
                  </Link>
                </NavItem>

                <NavItem>
                  <Link to="/login" className='nav-link'>
                    Login
                  </Link>
                </NavItem>
              </Nav>
            )}

          </Collapse>
        </Navbar>
      </div>
    );
  }
}

NavbarItem.propTypes = {
  auth:PropTypes.object.isRequired,
  logoutUser:PropTypes.func.isRequired,
}

const mapStateToProps = state =>({
  auth:state.auth,
})

export default connect(mapStateToProps, {logoutUser})(withRouter(NavbarItem))