'use strict'

const mongoose = require('mongoose')
const passportUtil = require('../utils/passport')
const validate = require('../config/validate')

const Schema = mongoose.Schema
/**
 * @apiDefine user User access only
 * This optional description belong to to the group user.
 */
const user = new Schema({
  firstName: {type: String, trim: true, default: '', minlength: 2, maxlength: 80},
  lastName: {type: String, trim: true, default: '', minlength: 2, maxlength: 80},
  email: {type: String, trim: true, unique: true, lowercase: true, required: true, default: '', maxlength: 80},
  skype: {type: String},
  avatar: {type: String},
  password: {type: String, default: ''},
  recentlyViewedBooks: {
    type: [
    {book: {type: Schema.Types.ObjectId, ref: 'Books'}, lastViewed: {type: Date}}
    ],
    select: false
  }
}, {
  collection: 'users',
  _id: true
})

user.path('password').set((value) => {
  return passportUtil.encryptPassword(value)
})

user.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.password
    return ret
  }
})

user.path('email').validate((value) => {
  const emailRegex = validate.email
  return emailRegex.test(value)
}, 'Please fill a valid email address')

module.exports = mongoose.model('User', user)
