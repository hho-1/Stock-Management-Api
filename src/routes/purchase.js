"use strict"


const router = require('express').Router()
/* ------------------------------------------------------- */

const permissions = require('../middlewares/permissions')
const purchase = require('../controllers/purchase')

router.route('/')
        .get(permissions.isLogin, purchase.list)
        .post(permissions.isLogin, purchase.create)
router.route('/:id')
        .get(permissions.isLogin, purchase.read)
        .put(permissions.isAdmin, purchase.update)
        .patch(permissions.isAdmin, purchase.update)               
        .delete(permissions.isAdmin,purchase.delete)

        
module.exports = router