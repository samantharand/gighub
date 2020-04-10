const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Band = require('../models/band')
const requireAuth = require('../lib/requireAuth')
const bandAuth = require('../lib/bandAuth')
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
//index route
router.get('/', async (req, res, next) => {
  try {
  		const foundBands = await Band.find().populate('user')
  		console.log(foundBands)
  		res.render('bands/index.ejs', {bands: foundBands})
  	}catch(error){
  		next(error)
  	}
  })
router.get('/new', requireAuth,  (req, res) => {
  
  	res.render('bands/new.ejs')
  
})

//have to add auth require later
router.post('/', upload.single("bandPhoto"), async (req, res, next) => {
  try {
  		const bandToCreate = {
  			name: req.body.name,
  			bandPhoto: req.file.path,
  			formed: req.body.formed,
  			genre: req.body.genre,
  			user: req.session.userId,
  			song: req.body.song
  		}
  		const createdBand = await Band.create(bandToCreate)
  		console.log(createdBand)
  		req.session.message = "you made a band"
  		res.redirect('/')
  	}catch(error){
  		next(error)
  	}
  })

//show routes
router.get('/:id', async (req, res, next) => {
  try {
  		const foundBand = await Band.findById(req.params.id).populate('user')
  		res.render('bands/show.ejs', {band: foundBand})
  	}catch(error){
  		next(error)
  	}
  })
router.get("/:id/edit", async (req, res, next) => {
  try {
  	const foundBand = await Band.findById(req.params.id).populate('user')
  	res.render('bands/edit.ejs', {band:foundBand})
  		
  	}catch(error){
  		next(error)
  	}
  })
router.put("/:id", upload.single('bandPhoto'), async (req, res, next) => {
  try {
  		if(req.file){
  			req.body.bandPhoto = req.file.path
  		}
  		const updatedBand = await Band.findByIdAndUpdate(req.params.id, req.body, {new:true})
  		res.redirect(`/bands/${updatedBand._id}`)
  	}catch(error){
  		next(error)
  	}
  })
router.delete("/:id", async (req, res, next) => {
  try {
  		const deletedBand = await Band.findByIdAndRemove(req.params.id)
  		res.redirect('/bands')
  	}catch(error){
  		next(error)
  	}
  })

module.exports = router