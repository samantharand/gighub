require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const session = require('express-session')

require('./db/db')

app.use(express.static('public'))

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))

const authController = require('./controllers/authController')
app.use('/auth', authController)


app.get('/', (req, res) => {
	res.render('home.ejs')
})

app.get('*', (req, res) => {
	res.render('404.ejs')
})

app.listen(PORT, () => {
	console.log(`Running on ${PORT}`);
})