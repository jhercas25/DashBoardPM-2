const express =  require('express');
const router= express.Router();
const passport=require('passport');
const {isLoggedin,isnotloggedin}=require('../lib/auth');

router.get('/signup',isnotloggedin,(req,res) =>{
    res.render('auth/signup');
});

router.post('/signup', isnotloggedin,passport.authenticate('Local.signup',{
    successRedirect:'/profile',
    failureRedirect:'/signup',
    failureFlash:true
}));   
   
router.get('/signin',isnotloggedin,(req,res)=>{
    res.render('auth/signin');
}
);
router.post('/signin',(req,res,next)=>{
    passport.authenticate('Local.signin',{
        successRedirect:'/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req,res,next);

});

router.get('/profile',isLoggedin,(req,res)=>{
    res.render('./profile/profile')
});

router.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect('/signin');
});

module.exports =router;