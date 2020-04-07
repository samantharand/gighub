const mongoose = require('mongoose')
const connectionString = process.env.MONGODB_URI

mongoose.connect(connectionString, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
 })

mongoose.connection.on('connected', () => {
  console.log(`Connected to data base ${connectionString}`);
})

mongoose.connection.on('disconnected', () => {
  console.log(`Diconnected to data base ${connectionString}`);
})

mongoose.connection.on('error', (err) => {
  console.log(`Error connecting to data base ${connectionString}`);
  console.log(err);
})