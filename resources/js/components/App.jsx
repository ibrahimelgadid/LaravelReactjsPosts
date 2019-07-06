import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { setCurrentUser } from "./actions/authAction";

// import { clearCurrentProfile } from "./actions/profileAction";


import NavbarItem from './components/NavbarItem';
import Allposts from './components/Allposts';
import AddPost from './components/AddPost';
import EditPost from './components/EditPost';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';



import jwt_decode from "jwt-decode";
import setAuth from "./components/setAuth";
import store from './store';
import Profile from './components/Profile';
import EditUserAvatar from './components/EditUserAvatar';
import NotFound from './components/NotFound';
import PrivateRoute from './components/PrivateRoute';

if(localStorage.userToken && localStorage.userData){
  setAuth(`Bearer ${localStorage.userToken}`);
  const userData = JSON.parse(localStorage.userData)
  store.dispatch(setCurrentUser(userData));
    
  let decode = jwt_decode(localStorage.userToken);
  let currentTime = Date.now()/1000;
  if(decode.exp < currentTime){
    localStorage.removeItem('appState');
    localStorage.removeItem('userToken');

    window.location.href = '/login';
  }
}


class App extends Component {

  render() {
  return (
    <div>
      <Router>
        <Switch>

        <NavbarItem/>
        </Switch>
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/register' component={Register}/>
              <Route exact path='/login' component={Login}/>
              <PrivateRoute exact path='/posts' component={Allposts}/>
              <PrivateRoute exact path='/addpost' component={AddPost}/>
              <PrivateRoute exact path='/editpost/:id' component={EditPost}/>
              <PrivateRoute exact path='/profile' component={Profile}/>
              <PrivateRoute exact path='/image/edit/:id' component={EditUserAvatar}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
        
      </Router>
    </div>
  );
  }
}

export default App;