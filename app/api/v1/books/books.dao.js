'use strict'

const bookModel = require('../../../models/book.model')
const bookHistoryModel = require('../../../models/booking-history.model')
const userDao = require('../users/users.dao')
const ObjectId = require('mongoose').Types.ObjectId
const errorHelper = require('../../../utils/errorHelper')
const _ = require('lodash')

module.exports.create = function (data, user) {
  // const addedBy = user.id
  const addedBy = new ObjectId()
  const book = _.assign(data, {
    addedBy
  })

  return bookModel.create(book)
    .catch((err) => {
      throw err
    })
}

module.exports.updateBook = function (bookId, data) {
  return _findBookById(bookId).then((book) => {
    book = _.assign(book, data)
    return book.save()
  })
    .catch((err) => {
      throw err
    })
}

module.exports.getBook = function (bookId) {
  return _findBookById(bookId)
  .catch((err) => {
    throw err
  })
}

module.exports.list = function (data) {
  return bookModel.find({
    state: 'active'
  })
  // .limit(data.limit).offset(data.offset).sort(data.sort)
}

module.exports.like = function (bookId, user) {
  return bookModel.finById(bookId)
    .then((book) => {
      if (!book) {
        throw util.errorHelper.badRequest()
      }

      return bookModel.udpate({
        _id: book.id
      }, {
        liked: {
          $inc: 1
        }
      })
    })
    .catch((err) => {
      throw err
    })
}

module.exports.disLike = function (bookId, user) {
  return bookModel.finById(bookId)
    .then((book) => {
      if (!book) {
        throw util.errorHelper.badRequest()
      }

      return bookModel.udpate({
        _id: book.id
      }, {
        disLiked: {
          $inc: -1
        }
      })
    })
    .catch((err) => {
      throw err
    })
}

module.exports.grabBook = function (bookId, user) {
  return _findBookById(bookId).then((book) => {
    book.bookedBy = user.id
    return book.save()
  })
    .then((grabbedBook) => {
      const newHistoryRecord = {
        dateFrom: new Date(),
        user: user.id,
        book: grabbedBook.id
      }
      return bookHistoryModel.create(newHistoryRecord)
    })
    .catch((err) => {
      throw err
    })
}

module.exports.returnBook = function (bookId, user) {
  return _findBookById(bookId).then((book) => {
    book.bookedBy = null
    return book.save()
  })
    .then((book) => {
      return [book, bookHistoryModel.findById(book.id)]
    })
    .spread((book, historyRecord) => {
      if (!historyRecord) {
        return book
      }
      historyRecord.dateTo = new Date()
      return historyRecord.save()
    })
    .catch((err) => {
      throw err
    })
}

module.exports.subscribe = function (bookId, user) {
  return _findBookById(bookId).then((book) => {
    if (!book.bookedBy) {
      book.bookedBy = user.id
      return book.save()
    }
    return book
  })
    .catch((err) => {
      throw err
    })
}

module.exports.unSubscribe = function (bookId, user) {
  return _findBookById(bookId).then((book) => {
    if (String(book.bookedBy) === String(user.id)) {
      book.bookedBy = null
      return book.save()
    }
    return book
  })
    .catch((err) => {
      throw err
    })
}

module.exports.removeBook = function (bookId, user) {
  return _findBookById(bookId).then((book) => {
    if (String(book.addedBy) === String(user.id)) {
      book.state = 'deleted'
      return book.save()
    }
    return book
  })
}

module.exports.increaseViewsCount = function (bookId, user) {
  return _findBookById(bookId).then((book) => {
    book.viewsCount += 1
    return [book.save(), userDao.addRecentlyViewedBooks(bookId, user)]
  })
    .spread((book) => book)
    .catch((err) => {
      throw err
    })
}

function _findBookById (id) {
  if (!ObjectId.isValid(id)) {
    throw errorHelper.badRequest()
  }
  return bookModel.findById(id).then((book) => {
    if (!book) {
      throw util.errorHelper.badRequest()
    }
    return book
  })
}
