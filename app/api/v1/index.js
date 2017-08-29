'use strict'

const express = require('express')
const router = express.Router()
const authController = require('./auth/auth.controller')
const passportMiddleware = require('./middlewares/passport')

router.use('/users', require('./users/users.controller'))
router.use('/groups', require('./groups/groups.controller'))
router.post('/auth', authController.signin)
router.put('/auth', authController.signup)

router.get('/auth', passportMiddleware.checkAuthToken, (req, res, next) => res.status(200).send('Ok'))

module.exports = router
