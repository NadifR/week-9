const express = require('express')
const app = express();
const port = 3000
const router = require("./routers/index.js")
const errorHandler = require("./middlewares/errorhandler.js")
const swagger =require(swagger-ui-express);
const moviesJson = require("./movies.json")
const morgan = require("morgan")

app.use(morgan('tiny'));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(moviesJson))
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use(router);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})