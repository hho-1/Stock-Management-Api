"use strict"

const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */

const UserSchema = new mongoose.Schema({

    username: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    isStaff: {
        type: Boolean,
        required: true,
        default: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    
  },{
    collection: 'users',
    timestamps: true
  })
  
  module.exports=mongoose.model('User', UserSchema)