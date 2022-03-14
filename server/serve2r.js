const PORT = 8000
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())



// MIDDLEWARE
//app.use('/users', () => console.log('middelware'))


// ROUTES
const usersRouter = require('./routes/users')
app.use('/users', usersRouter)


// CONNECTION TO DATABASE
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Conection to DB Successful'))


// Start listening
app.listen(3000, () => console.log("Server has started"))



