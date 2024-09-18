import User from '../models/user.model.js';
import dotenv from 'dotenv';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';
dotenv.config();

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
      await newUser.save();
      res.status(201).json({
        success: true,
        statusCode: 201,
        message: 'User Created Successfully',
      });
    } catch (error) {
      next(error);
    }
  };

export const signin = async(req, res, next) => {
    const { email, password } = req.body;
    
    try {
      const user = await User.findOne({email});
      if(!user){
        return next(errorHandler(404, 'User not found!'))
      }
      const validpass = bcryptjs.compareSync(password, user.password);
      if(!validpass)return next(errorHandler(401, 'Wrong credentials!'));
      const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
      const {password: pass, ...rest} = user._doc;
      return res.cookie('access_token', token, {httpOnly:true}).status(200).json(rest);
    } catch (error) {
      console.log(error)
      next(error);
    }
    
};