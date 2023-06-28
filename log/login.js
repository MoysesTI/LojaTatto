let formLogin = document.getElementById("register-form-login");
let validatorLogin = new Validator();
let formInptus = {
  emailLogin: () => document.getElementById("email-login"),
  passwordLogin: () => document.getElementById("password-login"),
};

const login = document.getElementById("login");

login.addEventListener("click", () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user);
      window.location.href = "./profileUser/profile.html";
    }
  });
});

function logoutLoginUser() {
  validatorLogin.validate(formLogin);
  showloading();
  firebase
    .auth()
    .signInWithEmailAndPassword(
      formInptus.emailLogin().value,
      formInptus.passwordLogin().value
    )
    .then((response) => {
      console.log("Usuario logado");
      window.location.href = "./profileUser/profile.html";
    })
    .catch((error) => {
      hideloadingCadastroLogin();
      alert(getErrorMessagem(error));
    });
}

function getErrorMessagem(error) {
  if (error.code == "auth/user-not-found" || "auth/invalid-email") {
    return "Email ou senha estão incorretos";
  }
  return error;
}

function recoverPassword() {
  showloading();
  firebase
    .auth()
    .sendPasswordResetEmail(formInptus.emailLogin().value)
    .then(() => {
      hideloadingCadastroLogin();
      alert("Alteração de senha foi enviada para o seu Email!");
    })
    .catch((error) => {
      hideloadingCadastroLogin();
      alert("Não encontramos seu Email");
    });
}
