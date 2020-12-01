const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log('connecting to', url)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
        console.log('connected to MongoDB')
    }).catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })
const urlSchema = new mongoose.Schema({
    original_url: {
        type: String
    },
    short_url: {
        type: String
    }
})

urlSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Funkurl', urlSchema)