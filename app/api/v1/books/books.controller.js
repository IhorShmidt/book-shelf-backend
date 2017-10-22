'use strict'

const router = require('express').Router()
const daoBook = require('./books.dao')

router.post('/', (req, res, next) => {
  const data = req.body
  const user = req.user
  return daoBook.create(data, user).then((result) => {
    res.status(200).json(result)
  })
    .catch((err) => next(err))
})

router.post('/:book/grab', (req, res, next) => {
  const bookId = req.params.book
  const user = req.user
  return daoBook.list(bookId, user).then((result) => {
    res.status(200).json(result)
  })
    .catch((err) => next(err))
})

router.post('/:book/returnbook', (req, res, next) => {
  const bookId = req.params.book
  const user = req.user
  return daoBook.returnbook(bookId, user).then((result) => {
    res.status(200).json(result)
  })
    .catch((err) => next(err))
})

router.get('/', (req, res, next) => {
  const data = req.book
  return daoBook.list(data).then((result) => {
    res.status(200).json(result)
  })
    .catch((err) => next(err))
})

router.get('/:book', (req, res, next) => {
  const bookId = req.params.book
  return daoBook.getBook(bookId).then((result) => {
    res.status(200).json(result)
  })
    .catch((err) => next(err))
})

router.put('/:book/dislike', (req, res, next) => {
  const bookId = req.params.book
  return daoBook.dislike(bookId).then((result) => {
    res.status(200).json(result)
  })
    .catch((err) => next(err))
})

router.put('/:book/views', (req, res, next) => {
  const bookId = req.params.book
  const user = req.user
  return daoBook.increaseViewsCount(bookId, user).then((result) => {
    res.status(200).json(result)
  })
    .catch((err) => next(err))
})

router.put('/:book/subscribe', (req, res, next) => {
  const bookId = req.params.book
  return daoBook.subscribe(bookId).then((result) => {
    res.status(200).json(result)
  })
    .catch((err) => next(err))
})

router.put('/:book/unsubscribe', (req, res, next) => {
  const bookId = req.params.book
  return daoBook.unSubscribe(bookId).then((result) => {
    res.status(200).json(result)
  })
    .catch((err) => next(err))
})

router.delete('/:book', (req, res, next) => {
  const bookId = req.params.book
  return daoBook.removeBook(bookId).then((result) => {
    res.status(200).json(result)
  })
    .catch((err) => next(err))
})

router.put('/:book/like', (req, res, next) => {
  const bookId = req.params.book
  return daoBook.like(bookId).then((result) => {
    res.status(200).json(result)
  })
    .catch((err) => next(err))
})

router.put('/:book', (req, res, next) => {
  const bookId = req.params.book
  const data = req.body
  return daoBook.update(bookId, data).then((result) => {
    res.status(200).json(result)
  })
    .catch((err) => next(err))
})

module.exports = router
