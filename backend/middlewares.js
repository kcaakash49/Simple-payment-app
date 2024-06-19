const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");


function authMiddleware(req,res,next){
    const token = req.headers.authorization;

    if(!token || !token.startsWith('Bearer ') ){
        return res.status(403).json({
            message:"invalid"
        })
    }

    const words = token.split(" ");
    const jwtToken = words[1];
    // console.log("jwtToken",jwtToken);
    try{
        const decodedValue = jwt.verify(jwtToken,JWT_SECRET);
        req.userId = decodedValue.userId
        
        next();
        
    }catch(err){
        res.status(403).json({
            msg:"invalid token"
        })
    }
    
}

module.exports = authMiddleware;