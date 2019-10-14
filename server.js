const express   = require("express")
const app       = express()
const fs        = require("fs")
const path      = require("path")
const ejs       = require("ejs")
const body_parser = require("body-parser")

app.use(body_parser.json())
app.use(body_parser.urlencoded({extended:false}))

// setting for web
app.engine("html",ejs.renderFile);
app.use("/",require("./routes/web"))
app.use("/api",require("./routes/api"));
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
// set bootstrap
app.use("/bootstrap",express.static(__dirname + "/node_modules/bootstrap/dist"))
app.use("/jquery",express.static(__dirname + "/node_modules/jquery/dist"))
app.use("/vue", express.static(__dirname + "/node_modules/vue/dist"))
// static
app.use("/assets",express.static(__dirname + "/views/assets"))
// read env
let env = JSON.parse(fs.readFileSync(".env"))
app.listen(env.app.port,() => {
    console.log(`app run on ${env.app.port}`)
})