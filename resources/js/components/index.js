import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from "./App.jsx";
import store from './store';
import { Provider } from "react-redux";



if (document.getElementById('example')) {
    ReactDOM.render(
        <Provider store = {store}>
        <App />
        </Provider>,
        document.getElementById('example'));
}
