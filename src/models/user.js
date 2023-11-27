"use strict"

const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */

const UserSchema = new mongoose.Schema({

    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true
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
      unique: true,
      index: true
    },
    first_name: {
      type: String,
      trim: true,
      required: true
    },
    last_name: {
      type: String,
      trim: true,
      required: true
    },
    is_active: {
        type: Boolean,
        required: true,
        default: true
    },
    is_staff: {
        type: Boolean,
        required: true,
        default: false
    },
    is_superadmin: {
        type: Boolean,
        required: true,
        default: false
    },
    
  },{
    collection: 'users',
    timestamps: true
  })


  //! Üstte password ve emailde yapacak oldugumuz validate ve set yerine asagidaki gibi de encrypt ve validation islemlerini yapabiliriz.

const passwordEncrypt = require('../helpers/passwordEncrypt')

//! mongoose middleware (Trigger)
//? save runs only in create


UserSchema.pre(['save', 'updateOne'], function(next){           // mongoose arka planda pre-save desteklemedigi icin buraya elle ekleyip o sekilde cözmeye calistik 
    
    const data = this?._update || this         //Hem update hem de create'te veriyi dataya atamis olduk
    console.log(data);
    
    const isMailValidated = data.email ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email) : true            //regex ifadelere bu sekilde test yazilabiliyor
    //console.log(isMailValidated);

    if(isMailValidated){
        if(data.password){
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#+]).{8,}$/
            const isPasswordValidated = passwordRegex.test(data.password)

            if(isPasswordValidated){
                data.password = passwordEncrypt(data.password)
                this.password = data.password     // for create
                this._update = data               // for update 
            }
            else{
                next(new Error('Password is not valid.'))
            }
        }
        
        next()
    }
    else{
        next(new Error('Email is not valid.'))
    }
})
UserSchema.pre(['init'], function (data) {
  data.id=data._id    
  data.createds = data.createdAt.toLocaleDateString('tr-tr')
})

  
  module.exports=mongoose.model('User', UserSchema)