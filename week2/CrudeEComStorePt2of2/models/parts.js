const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const partSchema = new Schema ({
    part: {
        type: String,
        required: true
    }       
})

module.exports = mongoose.model('Part', partSchema)