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





module.exports = router