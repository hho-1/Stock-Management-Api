"use strict"


const router = require('express').Router()
/* ------------------------------------------------------- */

const permissions = require('../middlewares/permissions')
const sale = require('../controllers/sale')

router.route('/')
        .get(permissions.isLogin, sale.list)
        .post(permissions.isLogin, sale.create)
router.route('/:id')
        .get(permissions.isLogin, sale.read)
        .put(permissions.isAdmin, sale.update)
        .patch(permissions.isAdmin, sale.update)               
        .delete(permissions.isAdmin,sale.delete)

        
module.exports = router