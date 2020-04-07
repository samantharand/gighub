const mongoose = require('mongoose')
const eventSchema = new mongoose.Schema({
event: {
	name:{
		type: String,
		required: true
	},
	band:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Band",
		required: true
	},
	user:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		// required: true
	},
	date:{
		type: Date,
		required: true
	},
	location:{
		type: String,
		required: true
	},
	eventPhoto: String,
	details: String,
	capacity: Number,
	comments: [Comment.schema],
	attendees: [User.schema], 

const Event = mongoose.model('Event', eventSchema)

module.exports = Event