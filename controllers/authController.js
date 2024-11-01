const express = require('express');
const passport = require('passport');


// const googleLogin =(req,res)=>{
//     passport.authenticate('google', { scope: ['profile', 'email'] })(req, res)

// }

const googleLogin = passport.authenticate('google', { scope: ['profile', 'email'] });

const callBack = (req, res, next) => {
    passport.authenticate('google', (err, user, info) => {
        if (err) {
            return next(err);  
        }
        if (!user) {
            return res.redirect('/'); 
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);  
            }
            return res.redirect('/api-docs');  
        });
    })(req, res, next);  
};

/**
 * @swagger
 * /auth/google/logout:
 *   get:
 *     summary: Log out the current user
 *     description: Logs the user out of their session and redirects to the home page.
 *     tags:
 *       - Authentication
 *     responses:
 *       302:
 *         description: Successfully logged out. Redirecting to the home page.
 *       400:
 *         description: Error occurred during logout.
 */
const googleLogout = (req, res) => {
  req.logout((error) => {
    if (error) {
      console.log('Logout error:', error);
      return res.status(400).json({ message: error.message });
    }
    console.log('User logged out');
    res.redirect('/');  
  });
};



module.exports = {
  googleLogin,
  callBack,
  googleLogout
};
