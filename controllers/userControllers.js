'use strict'

const userModel = require('../schemas/userSchema')
const Token = require('../services/createToken')

function createUser(req,res){
    let user = userModel()
    user.username = req.body.username
    user.passwd = req.body.passwd
    user.email = req.body.email

    user.save((err,userStored)=>{
        if(err){
            return res.status(500).send({error:`error al intentar guardar el usuario: ${err}`})
        }
        else{
            if(userStored){
                return res.status(200).send({response:"Usuario creado" ,token:Token.createToken(userStored._id) })
            }
        }
    })
}

function getUser(req,res){
    userModel.findById(req.body.userId,(err,user)=>{
        if(err) return res.status(500).send({response:`Error en la consulta ${err}`})
        if(!user){
            return res.status(404).send({response:`canal no encontrado`})
        }
        else{
            return res.status(200).send({response:user})
        }
       })
}


function getUsers(req, res){
    console.log("getAll")
    userModel.find({},(err,users)=>{
        if(err) return res.status(500).send({response:`Error en la consulta ${err}`})
        if(!users){
            return res.status(404).send({response:`canal no encontrado`})
        }
        else{
            
            return res.status(200).send({response:users})
        }
    })

}
function updateUser(req,res){
    userModel.findOneAndUpdate({_id:req.body.userId},{$set:req.body},{new:true},(err,userUpdated)=>{
        if(err) return res.status(500).send({error:`error al intentar actualizar el usuario: ${err}`})

        if(userUpdated){
            return res.body.send({response:"usuarioactualizado: "+userUpdated})
        }
    })
}

function deleteUser(req,res){
    userModel.findById(req.body.userId,(err,user)=>{
        if(err) return res.status(500).send({response:`Error en la consulta ${err}`})
        if(!user){
            return res.status(404).send({response:`usuario no encontrado`})
        }
        else{
            user.remove(err,()=>{
                return res.status(200).send({respose:"usuario borrado con exito"})
            })
        }
    })
}

module.exports ={createUser,getUser,getUsers,updateUser,deleteUser}
