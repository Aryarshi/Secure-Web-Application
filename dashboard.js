const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const token = localStorage.getItem("token");

if(!token){
    window.location.href="login.html";
}

function logout(){
    localStorage.removeItem("token");
    window.location.href="login.html";
}
