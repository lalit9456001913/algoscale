import React from 'react';
import './App.css';
import { Suspense, lazy } from 'react';
const Authentication = lazy(() => import('./Authentication'));
const Main = lazy(() => import('./Main'));

class  App extends React.Component{
   constructor(props) {
        super(props);
        this.state={
          isauth:false
        }
      }


componentDidMount(){
  fetch('/get_session').then(response=>response.json()).then(data=>{
    if(this.state.isauth){
        this.setState({
          data:data.status
       })
    }
    
  })
}

render(){
   if (!this.state.isauth) {
    console.log('inside if')
            return (<div><Suspense fallback="Loading....."><Authentication /></Suspense></div>)
        } else {
    console.log('inside else')
            return (<div><Suspense fallback="Loading....."><Main /></Suspense></div>);
        }
    }

}
    
  

export default App;
