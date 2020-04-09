const mongoose = require('mongoose')
const Comment = require('./comment')
const User = require('./user')


const photoSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	pic: {
		type: String,
		required: true
	},
	// event:{
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: "Event",
	// 	required: true
	// },
	date:{
		type: Date,
		default: Date.now
	},
	title: String,
})

const Photo = mongoose.model("Photo", photoSchema)

module.exports = Photo