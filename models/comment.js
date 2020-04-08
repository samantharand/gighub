const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
	text: String,
  	date: {
    	type: Date,
    	default: Date.now
  	},
  	user: {
    	type: mongoose.Schema.Types.ObjectId,
    	ref: 'User'
  	},
  	event: {
  		type: mongoose.Schema.Types.ObjectId,
     	ref: 'Event'
  	}
})
const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment