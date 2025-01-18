
import jwt from 'jsonwebtoken'

const isLoggedIn = (req, res, next) =>{
    try{
        const token = req.cookies?.jwtToken;
        
        if(!token){
            return res.status(400).json({
                status: "FAILED",
                message: "You are not logged in. Please log in!"
            })
            
        }
        
        const user = jwt.verify(token, process.env.PRIVATE_KEY)
        req.user = user;
        next() 

    }catch(err){
        res.status(500).json({
            status:"FAILED",
            msg:"You are not logged in. Please log in!"
        })
    }
}

export default isLoggedIn;