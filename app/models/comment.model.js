'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReplySchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  message: {type: String, maxlength: 5000},
  status: {type: Number, required: true}
}, {timestamps: true})

const CommentSchema = new Schema({
  model: {
    id: {type: Schema.Types.ObjectId, required: true},
    type: {type: String, enum: ['book'], default: 'book', required: true},
    title: {type: String}
  },
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  message: {type: String, maxlength: 5000},
  status: {type: Number, required: true},
  replies: [ReplySchema]
}, {timestamps: true})

CommentSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    ret.id = ret._id.toString()
    return ret
  }
})

/********************************************************************************
 * INDEXES
 ********************************************************************************/
CommentSchema.index({'model.id': 1, 'model.type': 1, createdAt: -1})
CommentSchema.index({'model.id': 1})

module.exports = mongoose.model('Comment', CommentSchema)
