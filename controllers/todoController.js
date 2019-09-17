'use strict'

const todoModel = require('../schemas/todoSchema')

function getTodo(req, res){
    console.log( "get One" + req.params.todoId);
    todoModel.findById(req.params.todoId,(err,todo)=>{

        if(err) return res.status(500).send({response:`Error en la consulta ${err}`})
        if(!todo){
            return res.status(404).send({response:`todo no encontrado`})
        }
        else{
            return res.status(200).send({response:todo})
        }
    })

}

function getTodos(req, res){
    console.log("getAll")
    todoModel.find({},(err,todos)=>{
        if(err) return res.status(500).send({response:`Error en la consulta ${err}`})
        if(!todos){
            return res.status(404).send({response:`todo no encontrado`})
        }
        else{
            
            return res.status(200).send({response:todos})
        }
    })

}

function createTodo(req,res){
    console.log("create todo " + req.body.name)
    let todo = todoModel()

    todo.name = req.body.name
    todo.description = req.body.description
    todo.complete = req.body.complete

    todo.save((err,todoStored)=>{
        if(err) return res.status(500).send({response:`Error en la consulta ${err}`})
        if(todoStored){
            return res.status(200).send({response:todoStored})
        }
   
    })
}

function updateTodo(req,res){
    console.log("update Todo" + req.params.todoId)
    todoModel.findOneAndUpdate({_id:req.params.todoId},{$set:req.body},{new:true},(err,todoupdated)=>{
        if(err) {return res.status(500).send({response:`Error en la consulta actualizar ${err}`})
        
        }
        else{     
            return res.status(200).send({respose:todoupdated})
        }

    })

}

function deleteTodo(req,res){
    console.log("delete Todo" + req.body.todoId)
    todoModel.findById(req.params.todoId,(err,todo)=>{
        if(err) return res.status(500).send({response:`Error en la consulta ${err}`})
        if(!todo){
            return res.status(404).send({response:`todo no encontrado`})
        }
        else{
            todo.remove(err,()=>{
                return res.status(200).send({respose:"todo borrado con exito"})
            })
        }
    })
}



module.exports ={getTodo,getTodos,createTodo,updateTodo,deleteTodo}