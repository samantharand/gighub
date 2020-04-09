module.exports=(req, res, next)=>{
	if(req.session.loggedIn){
		next()
	}else{
		req.session.message = "create an account if you want to do this"
		res.redirect('/auth/login')
	}
	
}