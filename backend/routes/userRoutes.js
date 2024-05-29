import express from 'express'
import User from '../models/userModel.js';
import { generateToken } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';


const userRouter = express.Router();

userRouter.post(
    '/signin',
    expressAsyncHandler(async(req,res)=>{
const user = await User.findOne({email:req.body.email});
console.log(user.password === req.body.password)
console.log("user.password"+" "+user.password);
console.log("req.body.password"+ " "+req.body.password)
console.log("user"+user)
console.log("req"+req)
console.log("req.body.email"+req.body.email);
console.log("user password"+user.password);
if(user)
    {
        const passwordMatch = bcrypt.compareSync(req.body.password,user.password);;
        console.log("password match" + " " + passwordMatch);
        if(passwordMatch)
            {
    res.send({
        _id:user._id,
        name : user.name,
        email :  user.email,
        isAdmin : user.isAdmin,
        token : generateToken(user)
    });
    return;
            }
    }
    res.status(401).send({message:'Invalid email or password'})
    })
);

userRouter.post(
    '/signup',
    expressAsyncHandler(async(req,res)=>{
        const newUser= new User({
            name:req.body.name,
            email : req.body.email,
            password : bcrypt.hashSync(req.body.password),
        });
const user = await newUser.save();
res.send({
    _id:user._id,
    name : user.name,
    email :  user.email,
    isAdmin : user.isAdmin,
    token : generateToken(user)
});
    }));


export default userRouter;


// if we have error we can handle it in server.js

