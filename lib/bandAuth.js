const User = require("../models/user")
const Band = require('../models/band')
module.exports=(req, res, next)=>{
	// console.log(Band.user)
	const bandId = req.params.id
	const foundBand = Band.find({_id: bandId}).populate('user')
	console.log("this is foundband")
	console.log(foundBand)
	if(req.session.userId === foundBand.user){
		next()
	}else{
		req.session.message = "you can't edit this. please login"
		console.log(req.session)
		res.render('auth/accessDenied.ejs')
		
	}
	
}