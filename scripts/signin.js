const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

const auth = firebase.auth();


signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

function createUser(){
    firebase.auth().createUserWithEmailAndPassword(document.getElementById("createEmail").value, document.getElementById("createPassword").value)
    .then((userCredential) => {
        var user = userCredential.user;
        // document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        document.cookie = 'username='+document.getElementById("createEmail").value
        document.cookie = 'password='+document.getElementById("createPassword").value
        window.location = "./home.html"
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
    });
}

function signInUser(){
    auth.signInWithEmailAndPassword(document.getElementById("signEmail").value,document.getElementById("signPassword").value).then((userCredential) => {
        var user = userCredential.user;
        // document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        document.cookie = 'username='+document.getElementById("signEmail").value
        document.cookie = 'password='+document.getElementById("signPassword").value
        window.location = "./home.html"
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
    });
    var user = auth.currentUser;
}