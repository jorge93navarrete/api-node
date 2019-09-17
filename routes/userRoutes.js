'use strict'

const express = require('express')
const routes = express.Router()
const userControllers = require('../controllers/userControllers')
const auth = require ('../services/auth')

routes.get('/user/:userId',userControllers.getUser)
routes.get('/user', userControllers.getUsers)
routes.post('/user/login', auth.login)

routes.post('/user', auth.isAuthenticated, userControllers.createUser),
routes.delete('/user/:userId', auth.isAuthenticated, userControllers.deleteUser)
routes.put('/user', auth.isAuthenticated, userControllers.updateUser)

module.exports = routes
