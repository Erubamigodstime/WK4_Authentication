const express = require('express')


const authCheck =(req, res, next)=>{
    if(!req.user){
        res.redirect('/');
    } else {
        next();
    }
}

const ensureAuth = (req, res, next)=>{
    if(req.isAuthenticated()){
        next()
    }else{
        res.send('You can not acces thiis endpoint')
    }
}

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

