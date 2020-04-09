const express = require('express')
const router = express.Router()
const Photo = require('../models/photo')
const User = require('../models/photo')
const multer = require('multer')

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './uploads/user')
	},
	filename: function(req, file, cb) {
		cb(null, new Date().toISOString() + file.originalname) // new Date().toISOString() + 
	}
})

const upload = multer({
	storage: storage
	// dest: 'uploads/'
})

// index page
router.get('/', async (req, res, next) => {
	try {
		const foundPhotos = await Photo.find()

		res.render('photos/index.ejs', {
			photos: foundPhotos
		})
	} catch (error) {
		next(error)
	}
})

// new photo page
router.get('/new', (req, res) => {
	res.render('photos/new.ejs')
})

// post 
router.post('/', upload.array('pic', 5), async (req, res, next) => {
	try {
		console.log("req.files vv");
		console.log(req.files);

		for(let i = 0; i < req.files.length; i++){			
			const newPhoto = {
				user: req.session.userId,
				pic: req.files[i].path,
				//title: req.body.title
			}
			await Photo.create(newPhoto)
			console.log("new photo vv");
			console.log(newPhoto);
		}

		res.redirect('/')
	} catch (error) {
		next(error)
	}
})

module.exports = router