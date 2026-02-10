const jwt = require("jsonwebtoken");
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");

module.exports = function(req,res,next){

    const header = req.header("Authorization");

    if(!header){
        return res.status(401).json({message:"No token"});
    }

    const token = header.split(" ")[1];

    try{

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verified;

        next();

    }catch{
        res.status(400).json({message:"Invalid token"});
    }
};
