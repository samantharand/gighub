band {
	name:{
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	}
	formed: Number,
	genre: String,
	music: String,
	location: String
}

event{
	name:{
		type: String,
		required: true
	},
	band:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Band",
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
	comments: [Comment.schema],
	attendees: []
}

user{
	username:{
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	age: Number,
	location: String,
	events: []
}

photo{
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	event:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Event",
		required: true
	},
	date:{
		type: Date,
		default: Date.now
	}
	title: String,
}

invite: {
	event reference
	
}


comment:{
 	text: String,
  	date: {
    	type: Date,
    	default: Date.now
  	},
  	user: {
    	type: mongoose.Schema.Types.ObjectId,
    	ref: 'User'
  	}
}