const form = document.forms['signup'];
form.addEventListener('submit', submitListener)
form['email'].addEventListener('blur', validateEmail);
form['email'].addEventListener('input', validateEmailInput);
form['password'].addEventListener('input', validatePassword);
let validEmail = false;
let validPassword = false;

function validateEmail() {
    const email = form['email'].value;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const error = document.querySelector('#error_email');
    if (!regex.test(email)) {
        error.classList.remove('hidden');
    }
    else {        
        error.classList.add('hidden');
    }
}

function validateEmailInput(){
    const email = form['email'].value;

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        validEmail = false;
    }
    else {        
        validEmail = true;
    }
    validateSubmit();
}

function validatePassword() {
    const password = form['password'].value;
    validPassword = (password.length > 0)
    validateSubmit();
}

function submitListener(event){
    if(validEmail && validPassword){
        return;
    }
    else{
        event.preventDefault();
    }
}

function validateSubmit(){
    const submit_button = form["submit"];

    if(validEmail && validPassword){
        event.preventDefault();
        submit_button.style.backgroundColor = "#3665f3";
        submit_button.style.cursor = "pointer";
    }
    else{
        submit_button.style.backgroundColor = "#707070";
        submit_button.style.cursor = "default";
    }
}