module.exports={

    isLoggedin(req,res,next){
        //console.log(req.isAuthenticated());
        if(req.isAuthenticated()){
            res.locals.user = req.user ;
            return next();
        }
        res.locals.user = false;
        return res.redirect('/signin');
    },
    isnotloggedin(req,res,next){
        if(!req.isAuthenticated()){
            res.locals.user =  false;
            return next();
        }
        res.locals.user = req.user ;
        return res.redirect('/profile');

    }
}