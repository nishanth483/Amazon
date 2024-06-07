import express from 'express';
import Product from '../models/productModel.js';
import expressAsyncHandler from 'express-async-handler';

const productRouter = express.Router();

// Route to get all products
productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const products = await Product.find();
    res.send(products);
}));

// Route to get a product by slug
productRouter.get('/slug/:slug', expressAsyncHandler(async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug });
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
}));

// Route to get distinct product categories
productRouter.get('/categories', expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
}));

// Route to get a product by ID
productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: "Product Not Found" });
    }
}));

export default productRouter;
