function errorHandler(err, req, res, next ) {
    if(err.name === "errorNotFound"){
        res.status(404).json({
            massage : "not found"
        })
    }
    else if (err.name === "wrong password"){
        res.status(400).json({
            message: "wronf password and email"
        })
    }
    else if(err.name === "Unauthentication")
        res.status(400).json({
            message: "Unauthentication"
        })
    else if(err.name ==="JWT error")
        res.status(400 ).json({
            message: "JWTerror"
        })
    else if(err.name ==="Unauthorized"){
        res.status(401).json({
            message: "Unauthorized"
        })
    }
    else {
        res.status(500).json({
            message : "internal error"
        })
    }

    console.log(err)
}


module.exports = errorHandler;