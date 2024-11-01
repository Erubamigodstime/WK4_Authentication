const express = require('express')


const authCheck =(req, res, next)=>{
    if(!req.user){
        res.redirect('/');
    } else {
        next();
    }
}

const ensureAuth = (req, res, next) => {
    console.log('Authenticated:', req.isAuthenticated());
    console.log('User:', req.user);

    if (req.isAuthenticated()) {
        next();
    } else {
        res.send('You cannot access this endpoint');
    }
};

// const ensureAuth = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     res.redirect('/auth/google'); // Redirect to Google login page
//   }
// };

module.exports = {
    authCheck,
    ensureAuth
}

