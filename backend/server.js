// import express from 'express'
// import data from './data.js';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import seedRouter from './routes/seedRoutes.js';
// import productRouter from './routes/productRoutes.js';

// dotenv.config();

// mongoose.connect(process.env.MONGODB_URL).then(() => {
//     console.log('Connected to MongoDB');
// }).catch((err) => {
//     console.error('Error connecting to MongoDB:', err.message);
// });

// const app = express();
// app.use('/api/seed',seedRouter);
// app.use('/api/products',productRouter);

// const port = process.env.port || 5000;

// app.listen(port,()=>{
// console.log(`server at http://localhost:${port}`)
// })



import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import http from 'http';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import path from 'path';

dotenv.config();

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});



import cors from 'cors';
const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, If-None-Match');
  res.setHeader('Access-Control-Allow-Origin', '*'); // You can restrict this to specific origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users',userRouter);
app.use('/api/orders',orderRouter);


const __dirname = path.resolve();
app.use(express.static(path.join(__dirname,'/frontend/build')));

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'/frontend/build/index.html'))
})


app.use((err,req,res,next)=>{
  res.status(500).send({message:err.message});
})



const port = process.env.PORT || 5000;

const server = http.createServer({
  maxHeaderSize: 8192 // Set the maximum size for headers (in bytes)
}, app);

server.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});





// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// // import helmet from 'helmet';
// import http from 'http';
// import seedRouter from './routes/seedRoutes.js';
// import productRouter from './routes/productRoutes.js';

// dotenv.config();

// mongoose.connect(process.env.MONGODB_URL)
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => {
//     console.error('Error connecting to MongoDB:', err.message);
//   });

// const app = express();

// // Use helmet to set various security headers
// // app.use(helmet());

// // Custom headers
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, If-None-Match');
//   res.setHeader('Access-Control-Allow-Origin', '*'); // You can restrict this to specific origins
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   next();
// });

// app.use('/api/seed', seedRouter);
// app.use('/api/products', productRouter);

// const port = process.env.PORT || 5000;

// // Create an HTTP server with a maximum header size
// const server = http.createServer({
//   maxHeaderSize: 8192 // Set the maximum size for headers (in bytes)
// }, app);

// server.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });


