
    const body = document.querySelector("body");
    const root = document.querySelector(":root");

document.getElementById('colorBtn').addEventListener("click", color);
 // Troca as cores do site para dark/light, pelo botão com id colorBtn
function color(){
    if (body.dataset.theme === "dark") {
        root.style.setProperty("--color-Frase", "rgb(240, 236, 236)")
        root.style.setProperty("--back-Grounds", "#010103")
        root.style.setProperty("--hover-Color", "#EEA6A7")
        root.style.setProperty("--colo-Footer", "#121212")
        body.dataset.theme = "light"
        } else {
        root.style.setProperty("--color-Frase", "#010103")
        root.style.setProperty("--back-Grounds", "#E9E9E9")
        root.style.setProperty("--hover-Color", "#EEA6A7")
        root.style.setProperty("--colo-Footer", "#121212)")
        body.dataset.theme = "dark"
        }
}



function menu(){
    const navbars = document.querySelector('.navBar');
    const colorMenu = document.querySelector('.menuOffOn');

    if(navbars.classList.contains('off_End_Onn')){
        navbars.classList.remove('off_End_Onn');
        document.querySelector('.menuOffOn').classList.remove('colorMenu');

    }else{
        navbars.classList.add('off_End_Onn');
        colorMenu.classList.add('colorMenu');
    }
}

