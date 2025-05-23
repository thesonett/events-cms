import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

function isAuthenticated(req, res, next) {
    const token = req.cookies?.token

    if (!token || typeof token !== 'string') {
        req.flash('message', 'Unauthorized. Please log in!')
        return res.redirect('/users/login')
    }

    try {
        const decoded = jwt.verify(token, process.env.MY_SECRET_KEY)
        req.user = decoded

        return next()
    } 
    catch (error) {
        console.error("JWT verify error!\n", error)
        req.flash('message', 'Invalid or expired token')
        return res.redirect('/users/login')
    }
}

export { isAuthenticated }
