"use strict"



const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */


const PurchaseSchema = new mongoose.Schema({

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    firmId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Firm',
      required: true
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 0
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
    price_total: {
      type: Number,
      default:0,
      // set: function(){ return this.price * this.quantity},
      default: function(){ return this.price * this.quantity}, // for Create
      transform: function(){ return this.price * this.quantity}, // for Update        
  }, 
  
  },{
    collection: 'purchases',
    timestamps: true
  })

PurchaseSchema.pre(['init'], function (data) {
    data.id=data._id    
    data.createds = data.createdAt.toLocaleDateString('tr-tr')    
})
  
  module.exports=mongoose.model('Purchase', PurchaseSchema)