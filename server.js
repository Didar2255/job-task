const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const morgan = require('morgan')
const bodyParser = require('body-parser')

const EmployeeRoute = require('./routes/Employe')
const AuthRoute = require('./routes/auth')


mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gzbym.mongodb.net/Tech-Foring?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err);
})

db.once('open', () => {
    console.log('Database connection Establish !');
})


const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())

app.use('/api/employee', EmployeeRoute)
app.use('/api', AuthRoute)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

