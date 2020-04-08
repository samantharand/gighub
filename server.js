require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const session = require('express-session')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

require('./db/db')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))
app.use((req, res, next) => {
	res.locals.loggedIn = req.session.loggenIn
	res.locals.username = req.session.username

	res.locals.message = req.session.message
	req.session.message = null

	next()
})

const authController = require('./controllers/authController')
app.use('/auth', authController)
const userController = require('./controllers/userController')
app.use('/users', userController)
const eventController = require('./controllers/eventController')
app.use('/events', eventController)

app.get('/', (req, res) => {
	res.render('home.ejs')
	console.log(req.session);
})

app.get('*', (req, res) => {
	res.render('404.ejs')
})

app.listen(PORT, () => {
	console.log(`Running on ${PORT}`);
})