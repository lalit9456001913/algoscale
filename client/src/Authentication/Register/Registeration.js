import React from 'react';
import  {Component}  from 'react';
import { Redirect } from 'react-router-dom';
import { BrowserRouter , Route, Link, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class Register extends React.Component{
	constructor(props){
		super(props)
		this.state={
			username:'',
			password:'',
			email:'',
			confirm_password:'',
			redirectToReferrer: false,
			p:[]
		}

	}


handleusernameChange=(name,value)=>{
	this.setState({
		[name]:value
	})
}

submitform=(e)=>{
	
	if(this.state.p.includes(this.state.username)){
		alert('username already taken')
	}
  e.preventDefault()
  const {username,email,password,confirm_password}=this.state

  //logic magic
  const requestOptions = {
        method: 'POST',
        
         headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
        body: JSON.stringify({ username: this.state.username,email:this.state.email,password:this.state.password,confirm_password:this.state.confirm_password})
    }
    
     fetch('/user', requestOptions)
        .then(response=>{
        	if(response.ok){
        		 let path = '/signin';
    			this.props.history.push(path);
        	}
        	//this.setState({redirectToReferrer:true});
         })
            
     }

render(){
	const redirectToReferrer = this.state.redirectToReferrer;
	

	return (

		<div>	
			<div>
		     <h1>Registeration Form</h1>

			      <form onSubmit={this.submitform}>
			         <input type="text" name="username"  placeholder="Username" value={this.state.username} onChange={(e)=>this.handleusernameChange('username',e.target.value)} required />
			         <input type="text" name="password" placeholder="password" value={this.state.password} onChange={(e)=>this.handleusernameChange('password',e.target.value)}  required/>
			         <input type="email" name="email" placeholder="email" value={this.state.email} onChange={(e)=>this.handleusernameChange('email',e.target.value)}  required/>
			         <input type="text" name="confirm_password"  placeholder="confirm_password" value={this.state.confirm_password} onChange={(e)=>this.handleusernameChange('confirm_password',e.target.value)} required />
			         <input type="submit"/>
			      </form>
     
  			</div>

  			<div> <Link to='/signin'>login</Link> </div>
  			<div> <Link to="signup">register another</Link>	 </div>

  		</div>


		)
}

}
export default Register;