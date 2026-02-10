document.getElementById("loginForm")
.addEventListener("submit", async function(e){

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try{

        const response = await fetch("http://localhost:5000/api/auth/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        console.log(data);

        if(response.ok){
            alert("Login successful!");
        }else{
            alert(data.message);
        }

    }catch(err){
        console.log("Fetch error:", err);
    }

});
