'use strict'

const userModel = require('../../../models/user.model')
const errorHelper = require('../../../utils/errorHelper')
const passportUtil = require('../../../utils/passport')
const _ = require('lodash')

module.exports.create = (data) => {
  return userModel.create(data)
    .then((data) => {
      return data
    })
    .catch((err) => {
      throw errorHelper.serverError(err)
    })
}

module.exports.findAll = () => {
  return userModel.find()
    .then((data) => {
      return data
    })
    .catch((err) => {
      throw errorHelper.serverError(err)
    })
}

module.exports.findOne = (id) => {
  return userModel.findById(id)
    .then((data) => {
      return data
    })
    .catch((err) => {
      throw errorHelper.serverError(err)
    })
}

module.exports.update = (id, data) => {
  if (data.password) data.password = passportUtil.encryptPassword(data.password)
  return userModel.findByIdAndUpdate(id, data, {new: true, overwrite: true, runValidators: true})
    .then((data) => {
      return data
    })
    .catch((err) => {
      throw errorHelper.serverError(err)
    })
}

module.exports.modify = (id, data) => {
  if (data.password) data.password = passportUtil.encryptPassword(data.password)
  return userModel.findByIdAndUpdate(id, {$set: data}, {new: true, runValidators: true})
    .then((data) => {
      return data
    })
    .catch((err) => {
      throw errorHelper.serverError(err)
    })
}

module.exports.addRecentlyViewedBooks = function (bookId, user) {
  return userModel.findOne({_id: user._id}).select('+recentlyViewedBooks')
    .then((user) => {
      var existingViewsBooks = _.find(user.recentlyViewedBooks, (item) =>
        item.book.toString() === bookId.toString()
      )

      if (existingViewsBooks) {
        existingViewsBooks.lastViewed = new Date()
        return user.save()
      }

      if (user.existingViewsBooks.length >= 10) {
        user.existingViewsBooks.shift()
      }

      user.existingViewsBooks.push({
        diagramVersion: bookId,
        lastViewed: new Date()
      })

      return user.save()
    })
}

module.exports.delete = (id) => {
  return userModel.findByIdAndRemove(id)
    .catch((err) => {
      throw errorHelper.serverError(err)
    })
}
