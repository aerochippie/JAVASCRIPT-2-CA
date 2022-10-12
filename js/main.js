
const baseUrl = 'https://nf-api.onrender.com/api/v1'
const regUrl = baseUrl + '/social/auth/register'

const registerButton = document.getElementById('registerButton');
const emailPattern = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;



const usernameError = document.getElementById('username-error')
const emailError = document.getElementById('email-error')
const passwordError = document.getElementById('password-error')




function validateForm(e) {
    e.preventDefault();
    const username = document.getElementById('usernameGet').value.trim();
    const password = document.getElementById('passwordGet').value.trim();
    const email = document.getElementById('emailGet').value.trim();

    if (username === '' || username.length < 3) {
        usernameError.innerHTML = "Enter a valid username (at least 3 characters)!"
    }
    else {
        usernameError.innerHTML = "";
    }

    if (email === '' || !emailPattern.test(email)) {
        emailError.innerHTML = "Enter a valid student email!"
    }
    else {
        emailError.innerHTML = "";
    }
    if (password === '' || email.length < 8) {
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



registerButton.addEventListener('click', validateForm);

