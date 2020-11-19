var bodyParser = require('body-parser')
var express = require("express")
var app = express()
var router = require("./routes/routes")
var port = 4000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

app.use("/", router);

app.listen(port, () => {
    console.log("Servidor rodando na porta " + port)
});