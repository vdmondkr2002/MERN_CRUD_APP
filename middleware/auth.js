const jwt = require('jsonwebtoken')

//wants to like a post
//Clicking on the like button(client) => (server)Goes through auth middleware,if it return next() => like Permission => server side changes => client side changes
const auth = (req,res,next)=>{
    try {
        //Get the token from headers
        const token = req.headers.authorization.split(" ")[1]
        //check if token's length is greater than 500, if not then token is given by google
        const customeAuth = token.length < 500

        let decodedData;

        if(token && customeAuth){
            //if custom authentication is done
            decodedData = jwt.verify(token,process.env.TOKEN_SECRET)  //get username and id
            req.userId = decodedData?.id   //get user id
        }else{
            //if custom authentication is done
            decodedData = jwt.verify(token,process.env.TOKEN_SECRET) //verify the token
            req.userId = decodedData?.sub //get user id
        }
        next()
    } catch (err) {
        console.log(err)
    }
}

module.exports = auth