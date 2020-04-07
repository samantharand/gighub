const mongoose = require('mongoose')

const bandSchema = new mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	},
	bandPhoto: String,
	formed: Number,
	genre: String,
	location: String,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}
})

const Band = mongoose.model('Band', bandSchema)

module.exports = Band