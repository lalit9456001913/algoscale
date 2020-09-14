const mongoose=require('mongoose')
const User=mongoose.Schema({
	user_id:{
		type:Number,
		require:true
	},
	username:{
		type:String,
		require:true
	},
	email:{ 
		type: String, 
		lowercase: true, 
		require: true 
	},
	password:{
		type:String,
		require:true
	},
	confirm_password:{
		type:String,
		require:true
	}
})

const login=mongoose.Schema({
	username:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	}

})
module.exports=mongoose.model('login_Model',login)
module.exports=mongoose.model('User',User)