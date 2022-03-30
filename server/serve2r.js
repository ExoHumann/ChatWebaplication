const PORT = 8000
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors())


app.use(express.json())
app.use(express.urlencoded({extended: true}))

console.log("hhhhh")


// MIDDLEWARE
//app.use('/users', () => console.log('middelware'))


// ROUTES
const usersRouter = require('./routes/users')
app.use('/users', usersRouter)


// CONNECTION TO DATABASE
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    family: 4,

})

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))


// Start listening

app.listen(PORT, () => console.log('Server has started ' + PORT))