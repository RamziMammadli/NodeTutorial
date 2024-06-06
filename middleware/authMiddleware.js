import jwt from 'jsonwebtoken'

import UserModel from '../models/userModel.js'


const userControlll = async (req,res, next) => {
let token

token = req.cookies.jwt

if ( token ) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        await UserModel.findById(decoded.userId).select('-password')

        next()
    } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error('sifre sehv')
    }
  }
}

export {userControlll}