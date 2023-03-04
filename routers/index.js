const express = require("express")
const router = express.Router();
const movie = require("./movies.js")
const client = require("../config.js");
const bcrypt = require("bcypt");
const Client = require("../config.js");
const salt = bcrypt.genSaltSycn(100);
const jwt = require("jsonwebtoken");
const { autentication } = require("../middlewares/auth.js");
const secretKey = "Rahasia"



router.post("/login", (req, res, nesxt) =>{
    const {email, password} =req.body;

    const findUser =`
    SELECT
     * 
    FROM user
    WHERE email = $1`

    client.query(findUser, [email], (err, result) =>{
        if(err) next (err)

        if(result.rows.length === 0) {
            next({name: "not found"})
        } else {
            const data = result.rows[0]
            const compare = bcrypt.compareSycn(password, data.password);
            

            if(compare) {
                const secretKey = jwt.sign({
                    id: data_id,
                    email: data.email,

                },secretKey)

                res.status(200).json({
                    id: data.id,
                    email: data.email,
                    is_admin: data.is_admin,
                    accessToken: accessToken
                })
            }else{
                next({name: "wrong password"})
            }
        }
    })

})

router.post("/register", (req, res, next) =>{
    const{email, gender, password, role} = req.body;

    const hash = bcrypt.hashSycn(password, salt);

    const insertUser= `
    INSERT INTO user (email, gender, passoword, role)
    VALUES
    ($1, $2, $3,$4);`

    Client.query(insertUser, [id, email, gender, password, role], (err, result) =>{
        if(err) next(err)

        res.status(200).json({
            massage: "user register"
        });
    })
})
router.use(autentication)
router.use("/", movieRouter)

module.exports = router;