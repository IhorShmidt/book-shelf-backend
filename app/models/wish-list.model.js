'use strict'

const mongoose = require('mognoose')

const Schema = mongoose.Schema
const bookState = ['active', 'deleted']

const WishListSchema = new Schema({
  clientTitle: {type: String, required: true, trim: true, minlength: 2, maxlength: 500},
  author: {type: String, trim: true, minlength: 2, maxlength: 500},
  link: {type: String, maxlength: 1024},
  viewsCount: {type: Number, default: 0},
  rating: {type: Number, default: 0},
  year: {type: Date},
  addedBy: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  state: {type: String, required: true, enum: bookState, default: 'active'},
  supportedBy: [{type: Schema.Types.Object, ref: 'User'}]
},
  {
    versionKey: false,
    timestamp: true,
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
  })

WishListSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    ret.id = ret._id.toString()
    delete ret._id
    return ret
  }
})

/********************************************************************************
 * INDEXES
 ********************************************************************************/
WishListSchema.index({clientTitle: 1})
WishListSchema.index({author: 1})

module.exports = mongoose.model('WishList', WishListSchema)
