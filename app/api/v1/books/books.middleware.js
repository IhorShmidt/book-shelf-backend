'use strict'

const joi = require('joi')
const errorHelper = require('../../../utils/errorHelper')

module.exports.validateCreate = (req, res, next) => {
  /*
  clientTitle: {type: String, required: true, trim: true, minlength: 2, maxlength: 500},
  description: {type: String, trim: true, minlength: 2, maxlength: 5000},
  author: {type: String, trim: true, minlength: 2, maxlength: 500},
  viewsCount: {type: Number, default: 0},
  rating: {type: Number, default: 0},
  pages: {type: Number},
  year: {type: Date},
  addedBy: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  state: {type: String, enum: bookState, default: 'active'},
  bookedBy: {type: Schema.Types.ObjectId, ref: 'User'},
  busyBy: {type: Schema.Types.ObjectId, ref: 'User'},
  liked: {type: Number, default: 0},
  disLiked: {type: Number, default: 0},
  imagePath: {type: String}

  */
  const schema = joi.object().keys({
    clientTitle: joi.string().min(2).max(500).required(),
    description: joi.string().min(2).max(5000).allow(null).allow(''),
    author: joi.string().min(2).max(500).optional().allow('').allow(null),
    pages: joi.number().optional().allow('').allow(null),
    year: joi.number().optional().allow('').allow(null),
    imagePath: joi.string().optional().allow('').allow(null)
  })

  joi.validate(req.body, schema, (err, value) => {
    if (err) {
      return next(errorHelper.invalidJoi(err))
    }
    req.body = value
    return next()
  })
}
