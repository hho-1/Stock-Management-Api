"use strict"


const router = require('express').Router()
/* ------------------------------------------------------- */

const permissions = require('../middlewares/permissions')
const category = require('../controllers/category')

router.route('/')
        .get(permissions.isLogin, category.list)
        .post(permissions.isLogin, category.create)
router.route('/:id')
        .get(permissions.isLogin, category.read)
        .put(permissions.isAdmin, category.update)
        .patch(permissions.isAdmin, category.update)               
        .delete(permissions.isAdmin,category.delete)

        
module.exports = router