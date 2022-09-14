function isLoggedIn(req, res, next) {
    if(!req.user) {
        req.flash('error', ' you must be signed in to access');
        res.redirect('/auth/login');
    } else {
        next();
    }
}

module.exports = isLoggedIn;