// gatekeeper function
const authReq = (req, res, next) => {
    
    let auth = req.isAuthenticated() //set by passport if user is authenticated

    if(auth){
        return next()
    }
    else{
        res.redirect('/login')
    }
}

module.exports = authReq;


