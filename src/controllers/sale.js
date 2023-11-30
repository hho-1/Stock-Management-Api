"use strict"

// Sale Controller:

const Sale = require('../models/sale')
const Product = require('../models/product')

module.exports={
    list: async (req, res) => {
        /*
            #swagger.tags = ["Products"]
            #swagger.summary = "List Sales"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */
    

        const data = await res.getModelList(Sale)   //find yerine bunu yapiyoruz cünkü pagination sayfasindaki search sort gibi seylerin aktif olabilmesi icin getModelList kullaniyoruz.

        res.status(200).send({
            error: false,
            detail: await res.getModelListDetails(Sale),
            data
        })
    },
    create: async (req, res) => {

        /*
            #swagger.tags = ["Sales"]
            #swagger.summary = "Create Sale"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: { }
            }
        */

        req.body.userId = req.user?._id

        const currentStocks = await Product.findOne({_id: req.body.productId})

        if(currentStocks.stock >= req.body.quantity){
            const data = await Sale.create(req.body)

            const updateProduct = await Product.updateOne({_id: data.productId}, {$inc:{ stock: -data.quantity}})

            res.status(201).send({
                error: false,
                data
            })

        }
        else{
            res.errorStatusCode = 422
            throw new Error(' not enough stock', {cause: {currentStocks}})
        }

        
        /* res.status(201).send({
            error: false,
            data
        }) */
    },
    read: async (req, res) => {

        /*
            #swagger.tags = ["Sales"]
            #swagger.summary = "Get Single Sale"
        */
        const data = await Sale.findOne({_id: req.params.id})

        res.status(200).send({
            error: false,
            data
        })
    },
    update: async (req, res) => {

        /*
            #swagger.tags = ["Sales"]
            #swagger.summary = "Update Sale"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                }
            }
        */

        req.body.userId=req.user?._id

        if(req.body?.quantity){
            const currentSale = await Sale.findOne({_id: req.params.id})
            const quantity = req.body.quantity - currentSale.quantity

            //Product'taki stok miktarinin satis miktarina göre güncellenmesi
            const updateProduct = await Product.updateOne({_id: currentSale.productId}, {$inc : {stock: -quantity}})
        }

        const data = await Sale.updateOne({_id: req.params.id}, req.body, {runValidators: true})

        res.status(202).send({
            error: false,
            data,
            new: await Sale.findOne({_id: req.params.id})
        })
    },
    delete: async (req, res) => {

        /*
            #swagger.tags = ["Sales"]
            #swagger.summary = "Delete Sale"
        */

        const currentSale = await Sale.findOne({_id: req.params.id})

        const data = await Sale.deleteOne({_id: req.params.id})

        const updateProduct = await Product.updateOne({_id: currentSale.productId}, {$inc : {stock: currentSale.quantity}})

        res.status(data.deletedCount ? 202 : 404).send({
            error: false,
            data
        })
    },
}








