import jwt from 'jsonwebtoken'

const generateToken = (res, userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
    res.cookie('jwt', token, {
        httpOnly:true,
        secure:true,
        sameSite:'strict',
        maxAge:50*24*60*60 // 50 gun
    })
}

export default generateToken