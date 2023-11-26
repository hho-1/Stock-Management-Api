"use strict"



const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */


const PurchaseSchema = new mongoose.Schema({

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    firmId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Firm',
      required: true,
      unique: true
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      unique: true
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
      required: true,
      unique: true
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    priceTotal: {
      type: Number,
      required: true
    },
  
  },{
    collection: 'purchases',
    timestamps: true
  })
  
  module.exports=mongoose.model('Purchase', PurchaseSchema)