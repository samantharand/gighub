const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username:{
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	profilePhoto:{ 
		type: String,
		default: "css/images/defaultuserphoto.png"
	},
	age: Number,
	location: String,
	// attending: [Events.schema],
	band: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Band",
	},
	event: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Event"
	},
})

const User = mongoose.model("User", userSchema)

module.exports = User