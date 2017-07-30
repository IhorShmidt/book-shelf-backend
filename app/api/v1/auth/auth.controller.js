'use strict'

const daoAuth = require('./auth.dao')

module.exports.signin = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  if (!email || !password) { throw util.errorHelper.badRequest() }

  daoAuth
    .signin(email, password)
    .then((result) => res.status(200).json(result))
    .catch((err) => next(err))
}

module.exports.signup = (req, res, next) => {
  const data = req.body
  if (!data.email || !data.password) { throw util.errorHelper.badRequest() }

  daoAuth
    .signup(data)
    .then((result) => res.status(200).json(result))
    .catch((error) => next(error))
}
