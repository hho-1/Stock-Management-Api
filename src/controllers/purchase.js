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

        req.body.userId = req.user?._id

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
        //const data = await Purchase.findOne({_id: req.params.id}).populate(['firmId','brandId','productId'])
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

        // son alımdaki değer                    
        const currentPurchase=await Purchase.findOne({ _id: req.params.id})    

        // son alımdai değerlerin yeni hali 
        //  console.log('**********');
        // console.log(req.body);   
        const data=await Purchase.updateOne({ _id: req.params.id},req.body,{ runValidators:true })
        // console.log('**********');
        // console.log(req.body.quantity);
        // console.log('**********');
        //console.log(currentPurchase.quantity);
        const quantity=req.body.quantity - currentPurchase.quantity
        // console.log('**********');
         //console.log(quantity);
        
        // // product daki stok miktarınn değişen alım miktarına göre güncellenmesi
        const updateProduct= await Product.updateOne({_id:currentPurchase.productId}, {$inc : {stock: quantity}})
   
        
        res.status(200).send({
            error: false,
            new: await Purchase.findOne({ _id: req.params.id})
        })
    },
    delete: async (req, res) => {

        /*
            #swagger.tags = ["Purchases"]
            #swagger.summary = "Delete Purchase"
        */

        const currentPurchase = await Purchase.findOne({_id: req.params.id})

        const data = await Purchase.deleteOne({_id: req.params.id})
        
        const updateProduct = await Product.updateOne({_id: currentPurchase.productId}, {$inc : {stock: -currentPurchase.quantity}})


        res.status(data.deletedCount ? 202 : 404).send({
            error: false,
            data
        })
    },
}








