const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Band = require('../models/band')
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
router.get('/new',  (req, res) => {
  
  	res.render('bands/new.ejs')
  
})

//have to add auth require later
router.post('/', async (req, res, next) => {
  try {
  		const bandToCreate = {
  			name: req.body.name,
  			bandPhoto: req.body.bandPhoto,
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
router.put("/:id", async (req, res, next) => {
  try {
  		const updatedBand = await Band.findByIdAndUpdate(req.params.id, req.body, {new:true})
  		res.redirect(`/bands/${updatedBand._id}`)
  	}catch(error){
  		next(error)
  	}
  })


module.exports = router