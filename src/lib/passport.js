const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');


passport.use('Local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    console.log('req ?' , req.body);
    const rows = await pool.query('SELECT * FROM users WHERE Username =?', [username]);
    console.log(rows);
    if (rows.length > 0) {
        const user = rows[0];
        validPassword = await helpers.matchPassword(password, user.password);
        //console.log(validPassword);
        if (validPassword) {
            done(null, user, req.flash('success', 'Bienvenido ' + user.username));
        }
        else {
            done(null, false, req.flash('msg', 'no mi pez '));
        }
    }
    else {
        return done(null, false, req.flash('msg', 'nombre de usuario no existe '));
    }



}));



passport.use('Local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, username, password, done) => {
    const { fullname,rol } = req.body;
    console.log(req.body);
    const newuser = {
        username,
        password,
        fullname,
        rol
    };
    newuser.password = await helpers.encryP(password);
    //console.log(newuser);
    const result = await pool.query('INSERT INTO users set ?', [newuser]);
    newuser.id = result.insertId;
    console.log(done);
    return done(null, newuser);

}));





passport.serializeUser((user, done) => {
    done(null, user.id);
    //console.log(user);
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM Users WHERE id = ?', [id])
    //console.log(rows);
    done(null, rows[0]);
});