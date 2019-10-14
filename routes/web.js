const express = require("express")
const app     = express.Router()
const Middleware = require("../core/middleware")
const middleware = new Middleware()
const home       = require("../controllers/home").HomeController
const auth       = require("../controllers/auth").AuthController
// home
app.get("/",home.index)
// login
app.get("/login",auth.login);

app.get("/login",(req,res) => {
    let token = middleware.store({
        username:"zulfikra",
        role:"admin"
    },"3 hour")
    return res.json(token)
})



module.exports = app 