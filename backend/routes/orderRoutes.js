import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';


const orderRouter = express.Router();
orderRouter.post('/',isAuth, expressAsyncHandler(async(req,res)=>{
    const newOrder = new Order({
      orderItems:req.body.orderItems.map((x)=>({...x,product:x._id})),
        shippingAddress : req.body.shippingAddress,
        paymentMethod:req.body.paymentMethod,
        itemsPrice:req.body.itemsPrice,
        taxPrice:req.body.taxPrice,
        shippingPrice:req.body.shippingPrice,
        totalPrice:req.body.totalPrice,
        user:req.user._id,
});


orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
const orders = await Order.find({user:req.user._id});
res.send(orders);
  })
);



orderRouter.get('/:id',
isAuth,
 expressAsyncHandler(async(req,res)=>{
  const order = await Order.findById(req.params.id);
  if(order)
    {
      res.send(order);
    }
    else
    {
      res.status(404).send({message:'Order Not Found'})
    }
})
)






const order = await newOrder.save();
res.status(201).send({message:'New Order Created',order});
}));

export default orderRouter;



// import mongoose from 'mongoose';

// const orderSchema = new mongoose.Schema(
//   {
//     orderItems: [
//       {
//         slug: { type: String, required: true },
//         name: { type: String, required: true },
//         quantity: { type: Number, required: true },
//         image: { type: String, required: true },
//         price: { type: Number, required: true },
//         product: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: 'Product',
//           required: true,
//         },
//       },
//     ],
//     shippingAddress: {
//       fullName: { type: String, required: true },
//       address: { type: String, required: true },
//       city: { type: String, required: true },
//       postalCode: { type: String, required: true },
//       country: { type: String, required: true },
//     },
//     paymentMethod: { type: String, required: true },
//     paymentResult: {
//       id: String,
//       status: String,
//       update_time: String,
//       email_address: String,
//     },
//     itemsPrice: { type: Number, required: true },
//     shippingPrice: { type: Number, required: true },
//     taxPrice: { type: Number, required: true },
//     totalPrice: { type: Number, required: true },
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     isPaid: { type: Boolean, default: false },
//     paidAt: { type: Date },
//     isDelivered: { type: Boolean, default: false },
//     deliveredAt: { type: Date },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Order = mongoose.model('Order', orderSchema);
// export default Order;
