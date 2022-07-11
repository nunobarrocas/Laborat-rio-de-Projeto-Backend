const mongoose = require('mongoose')


const patientSchema = mongoose.Schema({
    user_id: {
        type: String,
        
    },
    name:{
        type: String,
        required: true
    },
    birthdate: {
        type: String,
        required: true,        
    },
    height: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    avatar:{
        type: String,
        
    },
    gender:{
        type: String,
        required: true
    },
    temperature:{
        type: [{temp: String, date: String}]
    },
    bloodPressure:{
        type:[{high: String, low: String, date:String}]
    },
    medicines:{
        type:[{meds: String, date:String}]
    },
    oxygenSaturation:{
        type:[{oxyg: String, date: String}]
    },
    injuries:{
        type:[{injury: String, name: String}]
    },
    tempBool:{
        type: Boolean
    },
    bpBool:{
        type: Boolean
    },
    medsBool:{
        type: Boolean
    },
    oxygBool:{
        type: Boolean
    },
    injBool:{
        type: Boolean
    },
})

module.exports = mongoose.model('Patient', patientSchema)