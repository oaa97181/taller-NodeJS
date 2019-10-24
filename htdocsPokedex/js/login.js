window.onload = init;

function init() {
    document.querySelector('.btn-secondary').addEventListener('click', function() {
        window.location.href = "signin.html";
    });
    document.querySelector('.btn-primary').addEventListener('click', login);
}

function login(){
    var user = document.getElementById("input-mail").value;
    var pass = document.getElementById("input-password").value;
}
