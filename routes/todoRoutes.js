'use strict'

const express = require('express')
const routesTodo = express.Router()
const todoControllers = require('../controllers/todoController')
const auth = require ('../services/auth')

routesTodo.get('/todo/:todoId',todoControllers.getTodo)
routesTodo.get('/todo',todoControllers.getTodos)
routesTodo.post('/todo',auth.isAuthenticated, todoControllers.createTodo)
routesTodo.delete('/todo/:todoId' ,auth.isAuthenticated, todoControllers.deleteTodo)
routesTodo.put('/todo/:todoId',auth.isAuthenticated, todoControllers.updateTodo)
module.exports = routesTodo
