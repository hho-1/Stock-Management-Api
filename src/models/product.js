"use strict"


const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */

const ProductSchema = new mongoose.Schema({

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      unique: true
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
      required: true,
      unique: true
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    
    quantity: {
      type: Number,
      required: true,
    }
  
  },{
    collection: 'products',
    timestamps: true
  })
ProductSchema.pre(['init'], function (data) {
    data.id=data._id    
    data.createds = data.createdAt.toLocaleDateString('tr-tr')    
})
  
  module.exports=mongoose.model('Product', ProductSchema)