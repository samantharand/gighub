require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT

require('./db/db')

app.use(express.static('public'))

app.get('/', (req, res) => {
	res.render('home.ejs')
})

app.get('*', (req, res) => {
	res.render('404.ejs')
})

app.listen(PORT, () => {
	console.log(`Running on ${PORT}`);
})