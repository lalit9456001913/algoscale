import React from 'react';
import {Redirect} from 'react-router-dom'
import { BrowserRouter , Route, Link, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
class Home extends React.Component{
	constructor(props){
		super(props)
		this.state={
			isLogin:true,
			users:[]
		}
	}

logout=()=>{
	fetch('/Logout').then(response=>{
		if(response.ok){
			this.setState({
				isLogin:false
			})
			localStorage.removeItem('username');
		}
	})
  }

delete=(user_id)=>{
	const requestOptions = {
        method: 'POST',
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
        body: JSON.stringify({user_id:user_id})
    };
	fetch('/delete',requestOptions).then(response=>{
		console.log(response)
		if(response.ok){
        		 let path = '/';
    			this.props.history.push(path);
        	}
		}
	)
}
componentDidMount(){
	console.log('inside componentDidMounut')
	fetch('/user').then(response=>response.json()).then(data=>{
		console.log(data)
		this.setState({
			users:data
		})
	})
}

render(){
	
	if(!this.state.isLogin){
		return <Redirect to='/signin' />
	}
	return <div> 
		<h1>on home page </h1>
		<div>
			<table border="1">
				<thead>
					<tr>
						<th>ID</th>
						<th>Username</th>
						<th>Email</th>
					</tr>
				</thead>

				<tbody>
					{this.state.users.map(user =>(
						<tr>
							<td>{user.user_id}</td>
							<td>{user.username}</td>
							<td>{user.email}</td>
							<td><button onClick={(e)=>{this.delete(user.user_id)}}>delete</button></td>
						</tr>

						))}
				</tbody>
			</table>
		</div>
		<br></br>

		<button onClick={this.logout}>Logout</button>

		<span> <Link to="signup">register</Link> </span>
	</div>
}

}
export default withRouter(Home);
