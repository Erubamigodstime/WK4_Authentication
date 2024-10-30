const express = require('express');

const getHomePage = (req, res) => {
    res.render('home'); 
};

module.exports ={
    getHomePage
}

