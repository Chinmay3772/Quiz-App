function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });


    loginForm.addEventListener('submit',function(event){
    event.preventDefault();
    const formdata1 = new FormData(loginForm);
    fetch('/signin.php',{
        method:'POST',
        body:formdata1
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === 'success') {
            alert(data.message);
            window.location.href = 'quiz.html';
        }
        else {
            alert(data.message)
        }
    })
    .catch(error => {
        console.error(error);
        alert("Sign In failed")
    })
    .finally(()=>{
        document.querySelector('#login').reset();
    })});

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });

    const signupForm = document.querySelector("#createAccount")
    signupForm.addEventListener('submit',function(event){
        event.preventDefault();
        const formdata1 = new FormData(signupForm);
        fetch('/signup.php',{
            method:'POST',
            body:formdata1
        })
        .then(res => {
            if(res.data === 'success') {
                alert(data.message);
                window.location.reload();
            }
            else {
                alert(data.message)
            }
        })
        .catch(error => {
            console.error(error);
            alert("Sign Up failed")
        })
        .finally(()=>{
            document.querySelector('#createAccount').reset();
        })});
});