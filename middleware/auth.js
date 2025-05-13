function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }

    return res.redirect('/api/login?notify=' + encodeURIComponent('Unauthorized. Please log in!'));
}

export {
    isAuthenticated,
}