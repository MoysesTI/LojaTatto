let maiuscula = 0;
letra = /[A-Z]/;
let passwordLetra = "";
let form = document.getElementById("register-form");
let validator = new Validator();
let formCadastro = {
  emailCadastro: () => document.getElementById("email-register"),
  passwordCadastro: () => document.getElementById("password-register"),
  passwordconfirmationCadastro: () =>
    document.getElementById("passwordconfirmation"),
  firstnameUser: () => document.getElementById("name-register"),
  secondnameUser: () => document.getElementById("secondName-register"),
  date: () => document.getElementById("data-profile"),
  phoneNumber: () => document.getElementById("phoneNumber-profile"),
};
// Confirma se a senha tem letra maiuscula para fazer aceitação no password criar conta
// submit.addEventListener('click', function() {
const cadastro = document.getElementById("btn-submit");
cadastro.addEventListener("click", function () {
  passwordLetra = document.getElementById("password-register").value;
  for (let i = 0; i < passwordLetra.length; i++) {
    if (letra.test(passwordLetra[i])) {
      maiuscula++;
    }
  }
  // Validação para criar a conta do usuario
  validator.validate(form);
  showloading();
  const email = formCadastro.emailCadastro().value;
  const password = formCadastro.passwordCadastro().value;
  const passwordconfirmation =
    formCadastro.passwordconfirmationCadastro().value;
  if (password === passwordconfirmation && maiuscula > 0)
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password, passwordconfirmation)
      .then((result) => {
        showloading();
        let creatProfile = {
          date: formCadastro.date().value,
          fullname:
            formCadastro.firstnameUser().value +
            " " +
            formCadastro.secondnameUser().value,
          email: formCadastro.emailCadastro().value,
          phone: formCadastro.phoneNumber().value,
          user: {
            uid: firebase.auth().currentUser.uid,
          },
        };
        const informetionProfileUser = creatProfile;
        firebase
          .firestore()
          .collection("profileUser")
          .add(informetionProfileUser)
          .then(() => {
            hideloadingCadastroLogin();
          });
        console.log(informetionProfileUser);
        alert("Conta foi criada com sucesso!");
        form.reset();
        cadastroContainer().classList.add("off_End_Onn");
      })
      .catch((error) => {
        hideloadingCadastroLogin();
        alert("Email já está em uso tente novamente!");
      });
});
