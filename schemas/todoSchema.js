'use strict'

const mongoose = require ('mongoose')

const todoSchema = mongoose.Schema({
    name: {type:String},
    description:{type:String},
    complete:{type:Boolean}
})

module.exports = mongoose.model('todoModel',todoSchema)
