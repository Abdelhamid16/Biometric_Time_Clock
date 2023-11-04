require ('dotenv').config() 
const express = require('express')
const app = express()
const mongoose = require('mongoose')

// connect the mongoose to the url DATA_URL (you found it on .env )

mongoose.connect(process.env.DATA_URL, { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', (error) => console.log(error))
db.once('open', ()=> console.log('Connected to DataBase'))

app.use(express.json())

// Identify the route 
const employeesRouter = require('./routes/employees')
app.use('/employees', employeesRouter )



app.listen(3000, () => console.log('Server Created for node js code challenge'))