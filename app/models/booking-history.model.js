'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookingHistorySchema = new Schema({
  dateFrom: {type: Schema.Types.Date, required: true},
  dateTo: {type: Schema.Types.Date, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'user', required: true},
  book: {type: Schema.Types.Object, ref: 'Book'}
}, {
  versionKey: false,
  timestamp: true,
  toObject: {virtuals: true},
  toJSON: {virtuals: true}
})

BookingHistorySchema.set('toJSON', {
  transform: (doc, ret, options) => {
    ret.id = ret._id.toString()
    return ret
  }
})

/********************************************************************************
 * INDEXES
 ********************************************************************************/
BookingHistorySchema.index({book: 1})
BookingHistorySchema.index({dateFrom: 1, dateTo: 1})

module.exports = mongoose.model('BookingHistory', BookingHistorySchema)
