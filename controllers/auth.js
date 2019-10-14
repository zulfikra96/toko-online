const db  = require("../core/database").Database
class AuthController {
    login(req,res)
    {
        return res.render("login/index.html")
    }
    
    async authentication(req,res)
    {   
        let auth = await db.pgQuery("SELECT * FROM tb_user WHERE tb_user_username = $1 OR tb_user_email = $1",[req.body.username])
            .catch(err => console.log(err))
    }
}

exports.AuthController = new AuthController()