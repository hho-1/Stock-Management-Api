"use strict"


const router = require('express').Router()
/* ------------------------------------------------------- */

const permissions = require('../middlewares/permissions')
const firm = require('../controllers/firm')

const upload = require('../middlewares/upload')

router.route('/')
        .get(firm.list)
        .post(permissions.isAdmin, upload.array('image'), firm.create)          //upload.single: tek dosya yükleme, image --> field adi, upload.array: Birden fazla dosya yükleme
router.route('/:id')
        .get(firm.read)
        .put(permissions.isAdmin, upload.array('image'), firm.update)                  //upload.any: cok güvenilir degil, array kullanmak en mantiklisi
        .patch(permissions.isAdmin, upload.array('image'), firm.update)               //patch kismi güncelleme yaparken, put komple güncelleme yapar. express js'de default olan patch oldugu icin put'la göndersek de patch gibi kismi olarak yapmak mümkün
        .delete(permissions.isAdmin, firm.delete)

        
module.exports = router