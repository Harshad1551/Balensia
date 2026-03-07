const { findUserByEmail, CreateUser } = require('../services/authServices');
const { generateToken } = require('../configs/JWT')
const bcrypt = require('bcrypt')

exports.signup = async (req, res) =>{
    try{
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message:"All fields are required"
            })
        }

        const existingUser = await findUserByEmail(email);
        if(existingUser){
            res.status(401).json({
                messager:"User already exist"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = CreateUser(name, email, hashedPassword)

        const token = generateToken({
            id:user.id,
            email:user.email
        });

        res.status(201).json({
            user,
            token
        })
    }
   catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

}

exports.login = async(req,res) =>{
    try{

        const {email, password} = req.body;

        const user = await findUserByEmail(email);

        if(!user){
            return res.status(401).json({
                message:"Invalid email or password"
            });
        }

        const validPassword = await bcrypt.compare(
            password,
            user.password_hash
        )
        if(!validPassword){
            return res.status(401).json({
                message:"incorrect password"
            })
        }

        const token = generateToken({
             id: user.id,
            email: user.email
        });

        res.json({
            token,
            user:{
                id:user.id,
                name:user.name,
                email:user.email
            }
        })

    }catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
}