'use strict'

const UserModel = require('../../../models/user.model')
const _ = require('lodash')

module.exports.findOneByEmail = (email) => {
  return UserModel.findOne({email: email})
    .then((data) => {
      return data
    })
    .catch((err) => {
      throw util.errorHelper.serverError(err)
    })
}

module.exports.signin = (email, password) => {
  return UserModel
    .findOne({email: email.toLowerCase()})
    .then((user) => {
      if (!user) {
        throw util.errorHelper.badRequest()
      }
      if (user.password !== util.passport.encryptPassword(password)) {
        throw util.errorHelper.badRequest()
      }
      const token = util.passport.createAuthToken(user, null)
      return {token, user}
    })
}

module.exports.signup = (data) => {
  return UserModel.findOne({email: data.email.toLowerCase()})
    .then((user) => {
      if (user) { throw util.errorHelper.badRequest('user.err.email_exists') }
      const userObject = _.pick(data, ['firstName', 'lastName', 'avatar', 'email', 'password', 'phone', 'skype'])
      const newUser = new UserModel(userObject)
      return newUser.save()
    })
    .then((user) => {
      const token = util.passport.createAuthToken(user, null)
      return {user, token}
    })
}
