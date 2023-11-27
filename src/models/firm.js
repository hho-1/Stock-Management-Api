"use strict"


const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */

const FirmSchema = new mongoose.Schema({

    name: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true
    },
    address: {
        type: String,
        trim: true,
    },
    image: {
      type: Array,
      default: []
    }
  
  },{
    collection: 'firms',
    timestamps: true
  })
  
  module.exports=mongoose.model('Firm', FirmSchema)