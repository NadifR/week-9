const jwt = require("jsonwebtoken");
const secretKey = "Rahasia"
const client = require("../config.js");


function autentication(req, res, next){

    const {access_token} =req.headers;

    if(access_token) {
        try {
            const decoded = jwt.verify(access_token, secretKey);
            const {id, email} = decode 
            const findUser = `
            SELECT *
            FROM user
            WHERE id = $1;`

            client.query(findUser, [id], (err, result) =>{
                if(err) next(err);

                if(result.rows.length === 0){
                    next({name: "error not found"})
                }else{
                    const user = result.rows[0]

                    req.loggerUser ={
                        id: user.id,
                        email: user.email
                    }
                    next();
                }
            })
        } catch(err) {
            next({name: "JWTerror"})

        }
    }else{
        next({name:"Unauthentication"})
    }
}

function authorization(req, res, next){
    console.log(req.loggerUser);
    const {is_admin, email, id} = req.loggerUser;

    if(is_admin){

    }else{
        next({name: "Unauthorized"})
    }
}


module.exports = {autentication,authorization}