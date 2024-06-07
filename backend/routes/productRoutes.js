import express from 'express';
import Product from '../models/productModel.js';
import data from '../data.js';
import expressAsyncHandler from 'express-async-handler';

const productRouter = express.Router();

productRouter.get('/',async(req,res)=>{
    const products = await Product.find();
    
    res.send(products);
    console.log("nishanth");
    console.log(products);;
    console.log("products",products);
})

productRouter.get('/slug/:slug',async(req,res)=>{
    const product = await Product.findOne({slug : req.params.slug});
    if(product)
        {
            res.send(product);
        }
        else
        {
           res.status(404).send({message:'Product Not Found'}); 
        }
});


productRouter.get('/:id',async(req,res)=>{
    const product = await Product.findById(req.params.id);
    if(product)
        {
            res.send(product);
        }
        else
        {
            res.status(404).send({message:"Product Not Found"});
        }
})

productRouter.get(
    '/categories',expressAsyncHandler(async(req,res)=>{
        const categories = await Product.find().distinct('category');
       // use distinct to return unique category
       res.send(categories);
    })
)


export default productRouter;
