const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");

const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true,
        minlength:3
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true,
        minlength:6
    }

});

/* Hash password */
userSchema.pre("save", async function(next){

    if(!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

/* Compare password */
userSchema.methods.comparePassword = function(password){
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
