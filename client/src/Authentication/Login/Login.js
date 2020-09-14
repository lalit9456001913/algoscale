import React from 'react';


import {Redirect, BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Register from '../Register/Registeration.js';
import { Suspense, lazy } from 'react';

const Main = lazy(() => import('../../Main/index.js'));

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state={
          username:'',
          password:'',
          isLogin:false
        }
       


    }
 handleChange=(event)=> {
  
    this.setState({[event.target.name]: event.target.value});
  }
    
submitform = (e) => {
      e.preventDefault()
      let username=e.target[0].value
      let password=e.target[1].value
      
     
        //logic magic
        const requestOptions = {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        };
        fetch('/auth', requestOptions)
            .then(response  => {
                console.log(response)
                 if(response.ok){
                    this.setState({
                      isLogin:true
                    })
                    const token=localStorage.setItem("username",username)
                    
                   }

                })

        }

    render() {
        
        if (this.state.isLogin){

          return <Redirect to='/' />
        }
        
            return (


          <div class="login-form">

            <h1>Login Form</h1>
            <form onSubmit={this.submitform}>
              <input type="text" name="username"  placeholder="Username" value={this.state.username} onChange={this.handleChange} required />
              <input type="text" name="password" placeholder="password" value={this.state.password}  onChange={this.handleChange} required/>
              <input type="submit" />
            
            </form>
        
      <Link to="signup">register</Link>
  </div>


    )
  }
}

export default Login;