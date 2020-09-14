import { BrowserRouter as Router , Route, Link, Switch ,Redirect} from 'react-router-dom';
import Home from './Home/Home.js';
import React from 'react';
import Login from '../Authentication/Login/Login.js';
const routes = [
 
  {
    path: "/",
    exact:true,
    component: Home
  },
 
 {
  path:"/signin",
  exact:true,
  component:Login
 }
  
 
];
export default function(props) {
  console.log('inside Main')
  return (
        <div >
         <Router>
          <Switch>
            {routes.map((route, index) => (
            <Route key={index} {...route} />
             )
            )}
          </Switch>
         </Router>
        </div>
      );
}

 