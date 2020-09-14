
import Login from './Login/Login.js';
import Register from './Register/Registeration.js';
import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter as Router , Route, Link, Switch ,Redirect} from 'react-router-dom';
import Home from '../Main/Home/Home.js';


const routes = [
  {
    path: '/signin',
    exact: true,
    component:Login
  },
  {
    path:'/',
    exact:true,
    component:Home
  },
  {
    path: '/signup',
    component: Register
  },


  {
    path: '*',
    render: () => <Redirect to="/signin" />
  }
];
export default class Index extends React.Component {
  constructor(props){
    super(props)
    this.state={
      loginIn:false
    }
    
  }


  render(){
      return (
        <div >
       <Router>
          <Switch>
            {routes.map((route, index) => (
              <Route key={index} {...route}  />
            ))}
          </Switch>
       </Router>
        </div>
        );
  }
  
}