import express from "express"
import jwt from "jsonwebtoken"

const router = express.Router();

router.get('/user',(req,res)=>{
    const token = req.cookies.jwt;
    if(!token){
        return res.status(401).json({message:"Unauthorised or no valid cookie present"})
    }

    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        return res.status(200).json({userId:decode.userId})
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
})

export default router