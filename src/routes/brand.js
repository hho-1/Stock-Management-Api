"use strict"


const router = require('express').Router()
/* ------------------------------------------------------- */

const permissions = require('../middlewares/permissions')
const brand = require('../controllers/brand')

const upload = require('../middlewares/upload')

router.route('/')
        .get(permissions.isLogin, brand.list)
        .post(permissions.isAdmin, upload.array('image'), brand.create)          //upload.single: tek dosya yükleme, image --> field adi, upload.array: Birden fazla dosya yükleme
router.route('/:id')
        .get(permissions.isLogin, brand.read)
        .put(permissions.isAdmin, upload.array('image'), brand.update)                  //upload.any: cok güvenilir degil, array kullanmak en mantiklisi
        .patch(permissions.isAdmin, brand.update)               //patch kismi güncelleme yaparken, put komple güncelleme yapar. express js'de default olan patch oldugu icin put'la göndersek de patch gibi kismi olarak yapmak mümkün
        .delete(permissions.isAdmin, brand.delete)

        
module.exports = router