"use strict"


const router = require('express').Router()
/* ------------------------------------------------------- */

const permissions = require('../middlewares/permissions')
const user = require('../controllers/user')

router.route('/')
        .get(permissions.isLogin, user.list)
        .post(permissions.isLogin, user.create)
router.route('/:id')
        .get(permissions.isLogin, user.read)
        .put(permissions.isAdmin, user.update)
        .patch(permissions.isAdmin, user.update)               
        .delete(permissions.isAdmin,user.delete)

        
module.exports = router