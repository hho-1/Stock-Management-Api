"use strict"


// Auth Controller:

const User = require('../models/user')
const Token = require('../models/token')
const passwordEncrypt = require('../helpers/passwordEncrypt')
const { token } = require('morgan')

module.exports = {
    login: async (req, res) => {

        /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = 'Login with username (or email) and password.'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                }
            }
        */

        const { username, email, password} = req.body

        if((username || email) && password){

            const user = await User.findOne({ $or: [{username}, {email}] })

            if( user && user.password == passwordEncrypt(password)){

                if(user.is_active){
                    if(process.env.KEY_MODE=='token'){
                        // token generate}
                        let tokenData=await Token.findOne({userId:user._id})
              
                        if(!tokenData) tokenData= await Token.create({
                      
                                userId:user._id,
                                token: passwordEncrypt(user._id+Date.now())
                            })
                        res.send({
                            error:false,
                            key: tokenData.token,
                            user,
                        })    
                
                    }else if(process.env.KEY_MODE=='jwt'){
                        // generate JWT
                        const accessToken=jwt.sign(user.toJSON(), process.env.ACCESS_KEY, { expiresIn: '40m'})
                        const refreshToken=jwt.sign({_id:user.id,password:user.password}, process.env.REFRESH_KEY, { expiresIn: '40d'})
                    
                        res.send({
                            error:false,
                            bearer: {accessToken,refreshToken},
                            user,
                        })
                    }
                    
                    
                }
                else{
                    res.errorStatusCode = 401
                    throw new Error('This account is not active')
                }
            }
            else{
                res.errorStatusCode = 401
                throw new Error('Username or email is wrong')
            }
        }
        else{
            res.errorStatusCode = 401
            throw new Error('please enter username/email and password')
        }

    },
    logout: async (req, res) => {
        /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Logout"
            #swagger.description = 'Delete token key.'
        */

            const auth = req.headers?.authorization || null
            const tokenkey = auth ? auth.split(' ')[1] : null 

            //Delete token from db:

            const tokenData = await Token.deleteOne({token: tokenkey})

            res.send({
                error: false,
                message: 'logout was OK',
                data: tokenData
            })
    }
}


