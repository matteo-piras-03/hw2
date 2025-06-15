//laravel utilities
const check_signup_email_url = base_url + "/check_signup_email/";

const form = document.forms['signup'];
form.addEventListener('submit', submitListener)
form['name'].addEventListener('blur', validateName);
form['surname'].addEventListener('blur', validateName);
form['name'].addEventListener('input', validateNameInput);
form['surname'].addEventListener('input', validateSurnameInput);
form['email'].addEventListener('blur', validateEmail);
form['email'].addEventListener('input', validateEmailInput);
form['password'].addEventListener('focus', showPassword);
form['password'].addEventListener('blur', hidePassword);
form['password'].addEventListener('input', validatePassword);
form['confirm_password'].addEventListener('blur', validateConfirmPassword);
form['confirm_password'].addEventListener('input', validateConfirmPasswordInput);
var validName = false;
var validSurname = false;
var validEmail = false;
var validPassword = false;
var validConfirmPassword = false;

function validateName() {
    const name = form['name'].value;
    const surname = form['surname'].value;
    const error = document.querySelector('#error_name');
    if (name.length === 0 || surname.length === 0) {
        error.classList.remove('hidden');
    }
    else {
        error.classList.add('hidden');
    }
    validateSubmit();
}

function validateNameInput(){
    const name = form['name'].value;
    if (name.length === 0) {
        validName = false;
    }
    else {
        validName = true;
    }
}

function validateSurnameInput(){
    const surname = form['surname'].value;
    if (surname.length === 0) {
        validSurname = false;
    }
    else {
        validSurname = true;
    }
    validateSubmit();
}


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

async function validateEmailInput(){
    const email = form['email'].value;

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        validEmail = false;
    }
    else {        
        validEmail = true;
        await fetch(check_signup_email_url + encodeURIComponent(email),{method: "get"}).then(onResponse).then(onText);
    }
    validateSubmit();
}

function onResponse(response){
    return response.text();
}

function onText(text){
    const used_email_error = document.querySelector('#error_email_used');
    if(parseInt(text) === 1){
        validEmail = false;
        used_email_error.classList.remove("hidden");
    }
    else{
        validEmail = true;
        used_email_error.classList.add("hidden");
    } 
}

function showPassword() {
    const password = form['password'].value;
    const error = document.querySelector('#error_password');
    error.classList.remove('hidden');
}

function hidePassword() {
    const password = form['password'].value;
    const error = document.querySelector('#error_password');
    error.classList.add('hidden');
}

function validatePassword() {
    const password = form['password'].value;
    const error_length = document.querySelector('#error_password li[data-type=password_length]');
    const error_number = document.querySelector('#error_password li[data-type=password_number]');
    const error_uppercase = document.querySelector('#error_password li[data-type=password_uppercase]');
    const error_special = document.querySelector('#error_password li[data-type=password_special]');
    let length = false;
    let number = false;
    let uppercase = false;
    let special = false;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const specialRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (password.length >= 10) {
        error_length.classList.remove('unmet');
        length = true;
    }
    else {
        error_length.classList.add('unmet');
        length = false;
    }
    if (numberRegex.test(password)) {
        error_number.classList.remove('unmet');
        number = true;
    }
    else {
        error_number.classList.add('unmet');
        number = false;
    }
    if (uppercaseRegex.test(password)) {
        error_uppercase.classList.remove('unmet');
        uppercase = true;
    }
    else {
        error_uppercase.classList.add('unmet');
        uppercase = false;
    }
    if (specialRegex.test(password)) {
        error_special.classList.remove('unmet');
        special = true;
    }
    else {
        error_special.classList.add('unmet');
        special = false;
    }
    if(length && number && uppercase && special){
        validPassword = true;
    }
    else{
        validPassword = false;
    }
    validateSubmit();
}

function validateConfirmPassword() {
    const password = form['password'].value;
    const confirmPassword = form['confirm_password'].value;
    const error = document.querySelector('#error_confirm_password');
    if (confirmPassword !== password) {
        error.classList.remove('hidden');
        validConfirmPassword = false;
    }
    else {
        error.classList.add('hidden');
        validConfirmPassword = true;
    }
}

function validateConfirmPasswordInput() {
    const password = form['password'].value;
    const confirmPassword = form['confirm_password'].value;
    if (confirmPassword !== password) {
        validConfirmPassword = false;
    }
    else {
        validConfirmPassword = true;
    }
    validateSubmit();
}

function submitListener(event){
    if(validName && validSurname && validEmail && validPassword && validConfirmPassword){
        return;
    }
    else{
        event.preventDefault();
    }
}

function validateSubmit(){
    const submit_button = form["submit"];

    if(validName && validSurname && validEmail && validPassword && validConfirmPassword){
        submit_button.style.backgroundColor = "#3665f3";
        submit_button.style.cursor = "pointer";
    }
    else{
        event.preventDefault();
        submit_button.style.backgroundColor = "#707070";
        submit_button.style.cursor = "default";
    }
}