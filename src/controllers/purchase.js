"use strict"

// Purchase Controller:

const Purchase = require('../models/purchase')
const Product = require('../models/product')

module.exports={
    list: async (req, res) => {
        /*
            #swagger.tags = ["Purchases"]
            #swagger.summary = "List Purchases"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */
        
        const data = await res.getModelList(Purchase, {}, ['firmId', 'brandId', 'productId'])   //find yerine bunu yapiyoruz cünkü pagination sayfasindaki search sort gibi seylerin aktif olabilmesi icin getModelList kullaniyoruz.

        res.status(200).send({
            error: false,
            detail: await res.getModelListDetails(Purchase),
            data
        })
    },
    create: async (req, res) => {

        /*
            #swagger.tags = ["Purchases"]
            #swagger.summary = "Create Purchase"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: { }
            }
        */

        
        const data = await Purchase.create(req.body)

        const updateProducts = await Product.updateOne({_id: data.productId}, {$inc:{ stock: data.quantity}})

        res.status(201).send({
            error: false,
            data
        })
    },
    read: async (req, res) => {

        /*
            #swagger.tags = ["Purchases"]
            #swagger.summary = "Get Single Purchase"
        */
        const data = await Purchase.findOne({_id: req.params.id})

        res.status(200).send({
            error: false,
            data
        })
    },
    update: async (req, res) => {

        /*
            #swagger.tags = ["Purchases"]
            #swagger.summary = "Update Purchase"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                }
            }
        */

        //Son alimdaki deger
        const currentPurchase = await Purchase.findOne({_id: req.params.id})
        const quantity = req.body.quantity - currentPurchase.quantity

        //Son alimdaki degerlerin yeni hali
        const data = await Purchase.updateOne({_id: req.params.id}, req.body, {runValidators: true})

        //Product'taki stok miktarinin alim miktarina göre güncellenmesi
        const updateProducts = await Product.updateOne({_id: data.productId}, {$inc : {stock: quantity}})

        res.status(202).send({
            error: false,
            data,
            new: await Purchase.findOne({_id: req.params.id})
        })
    },
    delete: async (req, res) => {

        /*
            #swagger.tags = ["Purchases"]
            #swagger.summary = "Delete Purchase"
        */
        const data = await Purchase.deleteOne({_id: req.params.id})

        res.status(data.deletedCount ? 202 : 404).send({
            error: false,
            data
        })
    },
}








