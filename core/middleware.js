
const fs = require("fs")
const Cryptr = require("cryptr")

class Middleware {

    constructor()
    {
        let secreet = JSON.parse(fs.readFileSync(__dirname + "/../.env"))
        this.crypt = new Cryptr(secreet.app.private_key);
    }
    /**
     * 
     * @param {*} req request
     * @param {*} res response
     * @param {*} next next
     */
    auth(req,res,next)
    {
        if(req.headers.authorization == undefined || req.headers.authorization.split(" ")[0] != "bearer"){
            return res.status(422)
            .json({
                message:"Unauthorization"
            })
        }
        let file_name = ""
        let token = req.headers.authorization.split(" ")[1]
        if(token == ""){
            return res.status(422)
            .json({
                message:"Unauthorization"
            })
        }
        for (let i = 0; i < 15; i++) {
            file_name += token[i]
        }
        let chipper = fs.readFileSync(__dirname + "/../sessions/" + file_name + ".session");
        let plain   = chipper.toString("base64")
        let middleware = new Middleware()
        let object_data
        try {
            object_data = middleware.crypt.decrypt(plain); 
            // next()   
        } catch (error) {
            return res.status(422)
            .json({
                message:"Unauthorization"
            })
        }
        if(plain != token){
            return res.status(422)
            .json({
                message:"Unauthorization"
            })
        }
        object_data = JSON.parse(object_data)
        return object_data
    }  
    /**
     * 
     * @param {*} data data info from users
     * @param {*} expired expired of token / the form is 1 hours, 15 minutes , infinity
     */
    store(data,expired = Infinity)
    {
        let json = {
            data:data,
            expired:expired
        }
        let session_name = ""
        let time_format = expired.split(" ");
        let now = new Date()
        if(time_format[1] == "hours" || time_format[1] == "hour"){
            now.setHours(now.getHours() + parseInt(time_format[0]));
        }
        json["expired_time"] = now;
        let chipper = this.crypt.encrypt(JSON.stringify(json))        
        let text_buffer = Buffer.from(chipper,"base64");
        // console.log(this.encrypt(json));
        for(let i = 0; i < 15; i++){
            session_name+= chipper.charAt(i)
        }
        fs.writeFileSync( __dirname + "/../sessions/" + session_name + ".session",text_buffer)
        return chipper
    }
}
module.exports = Middleware