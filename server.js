require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT

require('./db/db')



app.listen(PORT, () => {
	console.log(`Running on ${PORT}`);
})