"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */

const permissions = require('../middlewares/permissions')
const product = require('../controllers/product')

router.route('/')
        .get(permissions.isLogin, product.list)
        .post(permissions.isLogin, product.create)
router.route('/:id')
        .get(permissions.isLogin, product.read)
        .put(permissions.isAdmin, product.update)
        .patch(permissions.isAdmin, product.update)               
        .delete(permissions.isAdmin,product.delete)

        
module.exports = router