const centralize = () =>{
    cadastroContainerLogin().classList.remove('centralize')
}
const addCentralize = () =>{
    cadastroContainerLogin().classList.add('centralize')
}

const cadastroContainer = () => document.getElementById('containerfhoter');
const formsConteudo = () => document.getElementById('main-container')
const cadastroContainerLogin = () => document.getElementById('containerfhoter-Login');


// Navegation cadastro
const fazerCadastro = document.getElementById('cadastro')
fazerCadastro.addEventListener('click', function(ev){
    ev.preventDefault()
    if(cadastroContainer().classList.contains('off_End_Onn')){
        cadastroContainer().classList.remove('off_End_Onn')
        cadastroContainerLogin().classList.add('off_End_Onn')
        centralize()
    }
})


// Navegation Login
const fazerLogin = document.getElementById('login')
fazerLogin.addEventListener('click', function(ev){
    ev.preventDefault()
    if(cadastroContainerLogin().classList.contains('off_End_Onn')){
        cadastroContainerLogin().classList.remove('off_End_Onn');
        cadastroContainer().classList.add('off_End_Onn')
        addCentralize()
    }
})
// Remove o login e cadastro pelo X
function closexfrom () {
    cadastroContainer().classList.add('off_End_Onn')
    cadastroContainer().classList.remove('centralize')
    cadastroContainerLogin().classList.add('off_End_Onn')
    centralize()
}


