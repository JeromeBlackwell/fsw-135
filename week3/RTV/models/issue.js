const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const issueSchema = new Schema ({
        issue1: {
        type: String,
        required: true
    },  
        issue2: {
        type: String,
        required: true
    },  
        issue3: {
        type: String,
        required: true
    }  
})

module.exports = mongoose.model('Issue', issueSchema)