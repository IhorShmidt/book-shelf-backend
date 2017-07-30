'use strict'

const express = require('express')
const router = express.Router()
const authController = require('./auth/auth.controller')

router.use('/users', require('./users/users.controller'))
router.use('/groups', require('./groups/groups.controller'))
router.post('/auth', authController.signin)
router.put('/auth', authController.signup)

module.exports = router
