const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', async (req, res, next) => {
	try {
		const foundUsers = await User.find()
		console.log(foundUsers);
		res.render('users/index.ejs', {
			users: foundUsers
		})
	} catch (error) {
		next(error)
	}
})

// show
router.get('/:id', async (req, res, next) => {
	try {
		const foundUser = await User.findById(req.params.id)

		res.render('users/show.ejs', {
			user: foundUser
		})
	} catch (error) {
		next(error)
	}
})
// edit

// update

// destroy

module.exports = router