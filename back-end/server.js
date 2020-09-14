//mongo connection
var mongoose = require('mongoose');
mongoose.Promise=global.Promise
url='mongodb://localhost:27017/test';
mongoose.connect(url,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
console.log('mongo has been connect')



//import express
const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session')
app.use(express.json());

//initialize session

app.use(session({
    secret: 'abcdef',
    proxy: true,
    resave: true,
    saveUninitialized: true,
     cookie: {
        maxAge: 24 * 60 * 60 * 1000 
    },
}));

//var http = require('http').Server(app);
app.listen(3001,()=> console.log('server is running on port '))

    
//Models

require('./scheema/users.js')
const User=mongoose.model('User')
const Login=mongoose.model('login_Model')

app.post('/auth',async(req,res)=>{
  var u_username = req.body.username;
  var u_password = req.body.password;

    const data=await User.findOne({username:u_username,
        password:u_password})
        if (!data){
            res.send({
                message:'something went wrong'
            })
        } else {
                   
            if (!req.session.username){
                   req.session.username=req.body.username 
            
            }
             
           res.sendStatus(200)
        }
   })


//user creation
app.post('/user',async(req,res)=>{
    const recent_id = await User.find().sort({ _id: -1 }).limit(1)
    var next_id = 1;
    if(recent_id.length > 0){
      next_id = recent_id[0].user_id + 1; 
    }
    var obj=new User();
    obj.user_id= next_id;
    obj.username=req.body.username;
    obj.email=req.body.email;
    obj.password=req.body.password;
    obj.confirm_password=req.body.confirm_password;
    obj.save()
    res.sendStatus(200)
})


app.post('/delete',async(req,res)=>{
  var removeQuery = User.deleteOne({user_id : req.body.user_id});
  removeQuery.exec()
  res.sendStatus(200)
})

app.get('/get_session',async(req,res)=> {
   if (req.session.username){
    res.sendStatus(200)
   }
  else{
    res.sendStatus(400)
  }
})

app.get('/user',async(req,res)=>{
  const user = await User.find({})
  res.send(user)
})


app.get('/Logout',async(req,res)=>{
  console.log('got logout')
 const sess=req.session;
    var data = {
        "Data":""
    };
    
    sess.destroy(function(err) {
        if(err){
         
            data["Data"] = 'Error destroying session';
            res.json(data);
        }else{
        
            data["Data"] = 'Session destroy successfully';
            res.json(data);
         }
    });
})
