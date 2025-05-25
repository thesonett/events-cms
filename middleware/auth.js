import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { getRoleById } from '../controller/index.js'

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
        console.error("Exception occurred inside isAuthenticated middleware!\n", error)
        req.flash('message', 'Invalid or expired token')
        return res.redirect('/users/login')
    }
}

async function isAdmin(req, res, next) {
    try {
        const decoded = jwt.verify(req.cookies?.token, process.env.MY_SECRET_KEY)
        req.user = decoded
        
        const { role } = await getRoleById(req.user.role_id)
        if(role === 'admin') {
            return next()
        }
        
        // else, Not an admin
        return res.redirect('/')
    } 
    catch (error) {
        console.error("Exception occurred inside isAdmin middleware!\n", error)
        return res.redirect('/')
    }
}

async function isUser(req, res, next) {
    try {
        const decoded = jwt.verify(req.cookies?.token, process.env.MY_SECRET_KEY)
        req.user = decoded
        
        const { role } = await getRoleById(req.user.role_id)
        if(role === 'user') {
            return next()
        }
        
        // else, Not an user
        return res.redirect('/')
    } 
    catch (error) {
        console.error("Exception occurred inside isUser middleware!\n", error)
        return res.redirect('/')
    }
}

async function isLoggedIn(req, res, next) {
    const token = req.cookies?.token

    res.locals.isLoggedIn = false
    res.locals.isAdmin = false

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.MY_SECRET_KEY)
            req.user = decoded
            res.locals.isLoggedIn = true
            res.locals.userId = req.user._id

            const { role } = await getRoleById(req.user.role_id)
            if (role === 'admin') {
                res.locals.isAdmin = true
                res.locals.userId = null
            }
        } 
        catch(error) {
            console.error("Exception occurred inside isLoggedIn middleware!\n", error)
        }
    }

    return next()
}


export { 
    isAuthenticated, 
    isAdmin,
    isUser,
    isLoggedIn,
}
