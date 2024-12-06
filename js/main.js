// register

let userName = document.getElementById("userName");
let email = document.getElementById("email");
let password = document.getElementById("password");
let btnRegister = document.getElementById("btnRegister");
let errorBox = document.getElementById("errorBox");
let displayUserName = document.getElementById("displayUserName");
let loginEmail = document.getElementById("loginEmail");
let loginPassword = document.getElementById("loginPassword");
let btnLogin = document.getElementById("btnLogin");
let btnLogout = document.getElementById("logout");

let userContainer = [];

if (JSON.parse(localStorage.getItem("user"))) {
  userContainer = JSON.parse(localStorage.getItem("user"));
}

if (JSON.parse(sessionStorage.getItem("user"))) {
  if (displayUserName != null) {
    displayUserName.innerHTML = `Welcome ${
      JSON.parse(sessionStorage.getItem("user")).userName
    }`;
  }
}

if (document.forms.length !== 0) {
  document.forms[0].addEventListener("submit", function (e) {
    e.preventDefault();
  });
}

if (btnRegister != null) {
  btnRegister.addEventListener("click", addUser);
}

function displayError(msg) {
  errorBox.classList.replace("d-none", "d-block");
  errorBox.innerHTML = msg;
}

function addUser() {
  if (userName.value != "" && email.value != "" && password.value != "") {
    if (validateEmail(email)) {
      if (checkUsedEmail(email.value) !== true) {
        errorBox.classList.replace("d-block", "d-none");
        let user = {
          userName: userName.value,
          email: email.value,
          password: password.value,
        };
        userContainer.push(user);
        localStorage.setItem("user", JSON.stringify(userContainer));
        window.location.href = "../index.html";
      } else {
        displayError("Email is used before");
      }
    } else {
      displayError("Enter a valid email");
    }
  } else {
    displayError("All inputs is required");
  }
}

function validateEmail(word) {
  let regex = /(\w)+@(\w)+\.(\w){2,}/;
  let isValid = regex.test(word.value);

  return isValid;
}

function checkUsedEmail(email) {
  let used;
  for (let i = 0; i < userContainer.length; i++) {
    if (email === userContainer[i].email) {
      used = true;
    }
  }
  return used;
}

// login

if (btnLogin != null) {
  btnLogin.addEventListener("click", loginUser);
}

function loginUser() {
  if (loginEmail.value !== "" && loginPassword.value !== "") {
    let validCheck ;
    for (let i = 0; i < userContainer.length; i++) {
      if (
        loginEmail.value === userContainer[i].email &&
        loginPassword.value === userContainer[i].password
      ) {
        sessionStorage.setItem("user", JSON.stringify(userContainer[i]));
        location.href = "../pages/home.html";
      } else {
        displayError("Incorrect email or password");
      }
    }
  } else {
    displayError("All inputs is required");
  }
}

// logout

if (btnLogout != null) {
  btnLogout.addEventListener("click", function () {
    sessionStorage.clear();
    location.href = "../index.html";
  });
}
