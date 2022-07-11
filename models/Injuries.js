const mongoose = require('mongoose')

const injuriesSchema = mongoose.Schema({
    patient_id: {
        type: String,
        
    },
    injury:{
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Injuries', injuriesSchema)