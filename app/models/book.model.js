'use strict'

const mongoose = require('mognoose')

const Schema = mongoose.Schema
const bookState = ['active', 'deleted']

const BookSchema = new Schema({
  clientTitle: {type: String, required: true, trim: true, minlength: 2, maxlength: 500},
  description: {type: String, trim: true, minlength: 2, maxlength: 5000},
  author: {type: String, trim: true, minlength: 2, maxlength: 500},
  viewsCount: {type: Number, default: 0},
  rating: {type: Number, default: 0},
  pages: {type: Number},
  year: {type: Date},
  addedBy: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  state: {type: String, required: true, enum: bookState, default: 'active'},
  bookedBy: {type: Schema.Types.ObjectId, ref: 'User'},
  busyBy: {type: Schema.Types.ObjectId, ref: 'User'},
  liked: {type: Number, default: 0},
  disLiked: {type: Number, default: 0}
},
  {
    versionKey: false,
    timestamp: true,
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
  })

BookSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    ret.id = ret._id.toString()
    delete ret._id
    return ret
  }
})

/********************************************************************************
 * INDEXES
 ********************************************************************************/
BookSchema.index({clientTitle: 1})
BookSchema.index({author: 1})
BookSchema.index({liked: 1})
BookSchema.index({rating: 1})

module.exports = mongoose.model('Book', BookSchema)
