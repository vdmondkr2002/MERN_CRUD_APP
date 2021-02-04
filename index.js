const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const body_parser = require('body-parser')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

//port
const PORT = process.env.PORT || 5000

//Loads .env file contents into | process.env.
dotenv.config({path:'./config/config.env'})

const app = express()

//connect to database
connectDB()

//sending and receiving images data through form or json
//limit : Controls the maximum request body size.
app.use(body_parser.json({limit:"30mb",extended:true}))
app.use(body_parser.urlencoded({limit:"30mb",extended:true}))

//cross origin request
app.use(cors())

//routes
app.use('/posts/',require('./routes/posts'))
app.use('/users/',require('./routes/users'))


app.listen(PORT,()=>console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`))


