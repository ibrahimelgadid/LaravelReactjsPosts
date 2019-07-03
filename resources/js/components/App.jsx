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

  componentDidMount() {
    
  }



  render() {
  return (
    <div className="App">
      <Router>
        <NavbarItem/>
        <Switch>
          <Route exact path='/' component={Home}/>
        </Switch>
        <Switch>
          <Route exact path='/register' component={Register}/>
        </Switch>
        <Switch>
          <Route exact path='/login' component={Login}/>
        </Switch>
        <Switch>
          <Route exact path='/posts' component={Allposts}/>
        </Switch>
        <Switch>
          <Route exact path='/addpost' component={AddPost}/>
        </Switch>
        <Switch>
          <Route exact path='/editpost/:id' component={EditPost}/>
        </Switch>
      </Router>
    </div>
  );
  }
}

export default App;