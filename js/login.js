

const baseUrl = 'https://nf-api.onrender.com/api/v1'
const loginUrl = baseUrl + '/social/auth/login'

export async function loginUser(url, userData) {

    try {
        const data = {
            method: "POST",
            headers: {
                "content-Type": "application/json",
            },
            body: JSON.stringify(userData),

        };

        const response = await fetch(url, data)
        const json = await response.json();

        const bearerToken = json.accessToken;
        const getName = json.name;
        
        if (response.status === 200) { 
            window.localStorage.setItem("bearerToken", bearerToken);
            window.localStorage.setItem("username", getName);
            window.location = "../home.html" }
        if (response.status === 401){
            window.alert("Email/Password combination is wrong, try again")
        }
    }
    catch (error) {
        console.log(error);
    }
 
};



function validateForm(e) {
    e.preventDefault();
    const password = document.getElementById('passwordGet').value.trim();
    const email = document.getElementById('emailGet').value.trim();
    const emailPattern = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

    if (email == '') {
        emailError.innerHTML = "Email is required to login"
    }
    else if (!emailPattern.test(email)) {
        emailError.innerHTML = "Email adress not valid"
    }
    else if (email.toLowerCase().includes("@noroff.no") || email.toLowerCase().includes("@stud.noroff.no") === false) {
        emailError.innerHTML = "Email adress must be a student email(@noroff.no or @stud.noroff.no)"
    }
    else {
        emailError.innerHTML = "";
    }

    if (password === '') {
        passwordError.innerHTML = "Enter your password"
    }
    else {
        passwordError.innerHTML = "";
    }
 

    const loginUserData = {
        email: email,
        password: password
    };

    console.log(loginUserData)
    loginUser(loginUrl, loginUserData);
}

const loginButton = document.getElementById('loginButton');
const onEnter = document.getElementById('passwordGet');
loginButton.addEventListener('click', validateForm);

window.addEventListener('keydown', (e) =>{ if(e.key === 'Enter'){
       validateForm(e)
    }})
