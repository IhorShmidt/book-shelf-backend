'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FollowSchema = new Schema({
  type: {type: String, enum: ['book'], default: 'book', required: true},
  isActive: {type: Boolean, default: true, required: true, index: true},
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  item: {type: Schema.Types.ObjectId, required: true},
  parent: {type: Schema.Types.ObjectId, index: true}
}, { timestamps: true })

/********************************************************************************
 * INDEXES
 ********************************************************************************/
FollowSchema.index({'user': 1, 'item': 1}, { unique: true })

FollowSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    ret.id = ret._id.toString()
    return ret
  }
})

module.exports = mongoose.model('Follow', FollowSchema)
