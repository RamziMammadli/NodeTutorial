import UserModel from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (user) {
    if (password == user.password) {
      generateToken(res, user._id);

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    }
  } else {
    res.status(400);

    throw new Error("Email ya sifre sehv");
  }
};

const registerUser = async ( req, res) => {
    const {name, email, password} = req.body

    const userControl = await UserModel.findOne({email})

    if(userControl){
        res.status(400).json({msg: 'Email has already taken'})
    }
    const user = await UserModel.create({name,email,password})

    if(user) {

        generateToken(res, user._id)

        res.json({_id:user._id, name: user.name, email: user.email})
    }
}

const logoutUser =  async( req,res) => {
    res.cookie('jwt', '', {
        httpOnly:true,
        expires: new Date(0)
    })

    res.status(200).json({msg: 'Log out'})
}

export { authUser, registerUser, logoutUser };
