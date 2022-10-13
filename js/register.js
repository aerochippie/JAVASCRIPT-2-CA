
const baseUrl = 'https://nf-api.onrender.com/api/v1'
const regUrl = baseUrl + '/social/auth/register'


function validateForm(e) {

    e.preventDefault();

    const emailPattern = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

    const username = document.getElementById('usernameGet').value.trim();
    const password = document.getElementById('passwordGet').value.trim();
    const email = document.getElementById('emailGet').value.trim();

    
    const usernameError = document.getElementById('username-error')
    const emailError = document.getElementById('email-error')
    const passwordError = document.getElementById('password-error')


    if (username === '' || username.length < 3) {
        usernameError.innerHTML = "Enter a valid username (at least 3 characters)!"
    }
    else {
        usernameError.innerHTML = "";
    }


    if (email == '') {
        emailError.innerHTML = "Email is required to register"
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


    if (password === '' || password.length < 8) {
        passwordError.innerHTML = "Password must be at least 8 characters"
    }
    else {
        passwordError.innerHTML = "";
    }


    const newUserData = {
        name: username,
        email: email,
        password: password
    };

    console.log(newUserData)
    newUser(regUrl, newUserData);
}




async function newUser(url, userData) {
    try {
        const data = {
            method: "POST",
            headers: {
                "content-Type": "application/json",
            },
            body: JSON.stringify(userData),

        };
        const response = await fetch(url, data)
        //console.log(response);
        const json = await response.json();
        //console.log(json);
        //console.log(userData)
        if (response.status === 201) { window.location = "../index.html" }
    }
    catch (error) {
        console.log(error);
    }
};


const registerButton = document.getElementById('registerButton');
registerButton.addEventListener('click', validateForm);

