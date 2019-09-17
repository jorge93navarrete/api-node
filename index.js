'use strict'

const express = require('express')
const mongoose = require('mongoose')
const todoRoutes = require('./routes/todoRoutes')
const userRoutes = require('./routes/userRoutes')
const bodyParse = require('body-parser')
const app = express()

app.use(bodyParse.urlencoded({extended:false}))
app.use(bodyParse.json())
app.use("/api",todoRoutes)
app.use("/api",userRoutes)

//app.use("/api",userRoutes)
mongoose.connect('mongodb://localhost:27017/todo',(err,res)=>{
    if(err){
        console.log(`error de conexion a la base de  datos ${err}`)
    }
    else{
        console.log("Conexion exitosa a la base de datos")
        app.listen(3000,()=>{

            console.log("app corriendo en puerto 3000")
        })
    }
})
