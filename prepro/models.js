band: {
	name:{
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	},
	bandPhoto: String,
	members: String,
	formed: Number,
	genre: String,
	location: String,
}

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
}

user: {
	username:{
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	profilePhoto: String,
	age: Number,
	location: String,
	events: [Events.schema],
	band: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Band",
	},
	event: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Event"
	},
}

photo: {
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
	},
	title: String,
}

comment: {
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

// events are private by default, anyone with an account can attend, since these are small shows we can use array of attendees in event model

// invite: {
// 	event reference
// }