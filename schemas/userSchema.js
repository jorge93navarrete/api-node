'use strict'

const mongoose = require ('mongoose')
const bcrypt = require('bcrypt')
const userSchema = mongoose.Schema({
    username : {type:String},
    passwd :{type:String,select:false},
    email : {type:String},

})

userSchema.pre('save', function (next){
    let user = this

    if(!user.isModified('passwd'))return next()
    bcrypt.genSalt(10, (err,salt)=>{
        if(err)return next(err)
        bcrypt.hash(this.passwd, salt, function(err, hash) {
            user.passwd = hash
            next()
        })
    })
})

module.exports = mongoose.model('userlModel',userSchema,'users')
