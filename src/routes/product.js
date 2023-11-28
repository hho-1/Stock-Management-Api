"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */

const permissions = require('../middlewares/permissions')
const product = require('../controllers/product')

router.route('/')
        .get(permissions.isStaff, product.list)
        .post(permissions.isAdmin, product.create)
router.route('/:id')
        .get(permissions.isStaff, product.read)
        .put(permissions.isStaff, product.update)
        .patch(permissions.isStaff, product.update)               
        .delete(permissions.isAdmin,product.delete)

        
module.exports = router