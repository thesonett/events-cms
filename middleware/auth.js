import dotenv from 'dotenv'
dotenv.config()

function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }

    // ::: TESTING ::: JWT token based authentication
    const token = req.cookies.token
    console.log("\nTOKEN ::: ", token)

    if(!token) {
        req.flash('message', 'Unauthorized. Please log in!');
        return res.redirect('/users/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) // THIS LINE NOT WORKING
        req.userId = decoded.userId

        return next()
    }
    catch(error) {
        req.flash('message', 'Invalid or expired token');
        return res.redirect('/users/login');
    }
}

export {
    isAuthenticated,
}