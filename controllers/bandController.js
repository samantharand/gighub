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



module.exports = router