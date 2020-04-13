const mongoose = require('mongoose')
const Comment = require('./comment')
const User = require('./user')
const eventSchema = new mongoose.Schema({

	name:{
		type: String,
		required: true
	},
	band:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Band",
		// required: true
	},
	user:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	date:{
		type: Date,
		required: true
	},
	location:{
		type: String,
		required: true
	},
	time: {
		type: String,
		required:true
	},
	eventPhoto: {
		type: String,
		default: "css/images/defaultEvent.jpg"
	},
	details: String,
	capacity: Number,
	comments: [Comment.schema],
	attendees: [User.schema], 
})
const Event = mongoose.model('Event', eventSchema)

module.exports = Event