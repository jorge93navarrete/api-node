'use strict'
const userModel = require('../schemas/userSchema')
const Token = require('../services/createToken')
const bcrypt = require('bcrypt')
const jwt = require('jwt-simple')
const moment = require('moment');


function login(req,res){
    userModel.findOne({email: req.body.email.toLowerCase()}, 'passwd', function(err, user) {
            if(err) return res.status(500).send({response:`Error en la consulta ${err}`})
            if(!user){
                return res.status(404).send({response:`usuario no encontrado`})
            }
            else{
                bcrypt.compare(req.body.passwd, user.passwd,(err,result)=>{
                    if(err)return res.status(500).send({response:`error interno ${err,user}`})
                    if(result) return res.status(200).send({token:Token.createToken(user._id)})
                 else{
                     return res.status(401).send({response:"contraseña incorrecta "})
                 }
                })
            }
    })
}

function isAuthenticated(req, res, next) {
    if(!req.headers.authorization) {
      return res
        .status(403)
        .send({response: "No se recibieron datos de autenticacion"});
    }
    
    var token = req.headers.authorization.split(" ")[1];
    var payload = jwt.decode(token, "Misupersecretaclave");
    
    if(payload.exp <= moment().unix()) {
       return res
           .status(401)
          .send({message: "El token ha expirado"});
    }
    
    req.user = payload.sub;
    next();
  }

module.exports = {login, isAuthenticated}
