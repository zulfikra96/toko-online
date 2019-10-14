const express   = require("express")
const app       = express.Router()
const auth      = require("../controllers/auth").AuthController
// API url
app.post("/login",auth.authentication)

module.exports = app