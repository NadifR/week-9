const express = require("express")
const router = express.Router();
const Client = require("../config.js");
const {authorization} = require("../middlewares/auth.js")

router.get("/movies",(req, res, next) =>{
    const {limit, page} = req.query;


    let resultLimit = limit?+ limit : DEFAULT_LIMIT;
    let resultpage = page?+ page : DEFAULT_PAGE;

    const findQuery =`
    SELECT
     *
    FROM  movies
    ORDER BY movies.id
    LIMIT ${resultLimit} OFFSET ${(resultpage -1)* resultLimit} `

    Client.query(findQuery, (err, result) =>{
        if(err) next(err)

        res.status(200).json(result.rows);
    })
})

router.get("/movies/:id", (req, res, next) => {

    const {id} = req.params

    const findQuery =`
    SELECT
    *
    FROM movies
    WHERE movies.id = $1
    `
    Client.query(findQuery, [id], (err, result, next) =>{
        if(err) next(err)

        if(result.rows.legth === 0) {
            next({name: "errorNotFound"})
        } else {
            res.status(200).json(result.rows[0]); 
        }

    })

 router.post("/movies", authorization, (req, res, next) => {
    const {id, title, genres, year} = req.body;
    const createmovies = `
    INSERT INTO movies (id, title, genres, year)
    VALUES
    ($1, $2, $3, $4)
    RETURNING *;`




     Client.query(createmovies, [id, title, genres, year], (err, result) =>{
         if(err) next (err)

    const data =result.rows[0]
    let insertGenres = `
    INSERT INTO movies_genres (movies_id, genres_id)
    VALUES `

    for(let i =0; i<genres.leght; i++){
        let inputGenres =`(${data.id}, ${genres[i]})`
        if(i === genres.legth -1) {
            inputGenres += ';'
        } else {
            inputGenres += ','
        }

        insertGenres += inputGenres
    }

    Client.query(insertGenres, (err, result) =>{
        if(err) next(err)

        res.status(201).json({
            massage: "movies vrated successfully"
        })
    })
 }) 


 router.put("/movies/:id", (req, res, next) =>{
    const {title, genres, year} = req.body;

    const updatemovies = `
    UPDATE movies 
    SET title =$1,
        genres = $2,
        year = $3
    WHERE id = $4`;


    Client.query(updatemovies, [title, genres, year], (err,result ) =>{
        if(err) next(err)

        res.status(200).json({
            massage: "Update successfully"
        })
    })
 })

router.delete("/movies/:id", (req, res, next) =>{

    const {id} = req.params;

    const deletemoviesGenres =`
        DELETE FROM movies
        WHERE genres_id = $1;`

    Client.query(deletemoviesGenres, [id],(err, result) =>{
        if(err) next(err)

        const deletemovies =`
            DELETE FROM movies
            WHERE id = $1;`


        Client.query(deletemovies, [id], (err, result) =>{
            if(err) next(err)

            res.sendStatus(200).json({
                massage: "delete successfully"
            })
        })
    })
})

module.exports = routers