
class HomeController {
    index(req,res,session)
    {
        return res.render("home/index.html");
    }
}

exports.HomeController = new HomeController()