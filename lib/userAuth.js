const User = require("../models/user")
module.exports=(req, res, next)=>{
	if(req.session.userId === req.params.id){
		next()
	}else{
		req.session.message = "you can't edit this. please login"
		console.log(req.session)
		res.render('auth/accessDenied.ejs')
		
	}
	
}