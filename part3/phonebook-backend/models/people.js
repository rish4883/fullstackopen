require('dotenv').config()

const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set("strictQuery", false)
mongoose.connect(url)
    .then(res => {
        console.log('Connected to database')
    })
    .catch(err => {
        console.log('Failed to connect: ', err.message)
    })

const personSchema = new mongoose.Schema({
    name: String,
    contact: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
