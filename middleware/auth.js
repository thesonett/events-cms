function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }

    req.flash('message', 'Unauthorized. Please log in!');
    return res.redirect('/users/login');
}

export {
    isAuthenticated,
}