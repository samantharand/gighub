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
	// members: String,
	formed: Number,
	genre: String,
	location: String,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
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
	attendees: [User.schema], // weird mongo query to list all shows " i'm " attending
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
	dateOfBirth: Date,
	location: String,
	events: [Events.schema],
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
  	},
  	event: {
  		type: mongoose.Schema.Types.ObjectId,
     	ref: 'Event'
  	}
}

// events are private by default, anyone with an account can attend, since these are small shows we can use array of attendees in event model

// invite: {
// 	event reference
// }