const { verifyToken } = require('../configs/JWT')

const authenticateToken = (req,res,next)=>{
    try{

        const authHeader = req.headers.authorization;

        if(!authHeader) {
            return res.status(401),json(
                {
                    success: false,
                    message:"Authorization token is required"
                }
            )
        }

        const token = authHeader.split(' ')[1];

        if(!token) {
            return res.status(401).json(
                {
                    success: false,
                    message:"Token is required"
                }
            )
        }

        const decodedToken = verifyToken(token);

        req.user = decodedToken;

        next();

    }catch(error){
        return res.status(500).json({message:error.message})
    }
}