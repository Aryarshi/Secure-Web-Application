const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
document.getElementById("signupForm")
.addEventListener("submit", async function(e){

e.preventDefault();

const username = document.getElementById("username").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

try{

const res = await fetch("/api/auth/signup",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
username,
email,
password
})
});

const data = await res.json();

document.getElementById("message").innerText = data.message;

}catch(err){

document.getElementById("message").innerText="Server error";

}

});
