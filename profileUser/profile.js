
firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        console.log(user)
        findTransactions(user)
        buyCarrinho(user)
    }
})
let data 
let modalKey
// Sai da conta atual que esteja logada 
function logout(){
    firebase.auth().signOut().then(()=>{
        window.location.href = "../index.html"
    }).cath(()=>{
        alert('erro ao tentar fazer logout')
    })
}   
const pegarKey = (e) => {
    // .closest retorna o elemento mais proximo que tem a class que passamos
    // do .pizza-item ele vai pegar o valor do atributo data-key
    key = e.target.closest('.cart--item').getAttribute('data-set')
    modalKey = key
    console.log(modalKey)
    return key
}


    // Faz as verification dentro do firestore pegando um obj return ele pegando os valor e adicionando na tela
    const nameProfile = document.getElementById('name-profile')
    const emailProfile = document.getElementById('email-profile')
    const dataProfile = document.getElementById('data-profile')
    const telefone = document.getElementById('phoneNumber-profile')
    const idade = document.getElementById('idade-profile')
    function findTransactions(user){
        firebase.firestore()
        .collection('profileUser')
        .where('user.uid', '==', user.uid)
        .get()
        .then(snapshot=>{
            snapshot.docs.forEach(doc =>{
                console.log(snapshot)
                console.log(doc.data())
                emailProfile.innerHTML = doc.data().email
                data  = doc.data().date
                dataProfile.innerHTML = new Date(data).toLocaleDateString('pt-br')
                nameProfile.innerHTML = doc.data().fullname
                telefone.innerHTML = doc.data().phone
                // faz o calculo da data atual com a data de nascimento para pegar a idade do userAtual
                mudarData()
                
            })

        })

    }

    const  mudarData = () =>{
        const today = new Date();
        const birthDate = new Date(data);
        let niver = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            niver--;
        }
        idade.innerHTML = niver
    }
let valor

    function buyCarrinho(user){

            firebase.firestore()
            .collection('banco')
            .where('user.uid', '==', user.uid )
            .get()
            .then(snapshot=>{
                snapshot.docs.map((doc, index)=>{

                    let cartItem = document.querySelector('.models .cart--item').cloneNode(true)
                    document.querySelector('.cart').append(cartItem)
                    document.querySelector('.tatto-area').append(cartItem)
                    addproduct(cartItem,doc,index)
                                
            })
        })

    } 
    let valores
        const addproduct = (cartItem, doc) =>{
            valores = doc.data()
            cartItem.setAttribute('data-set', valores.informetionProducts.price)
            console.log(valores)
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', (e) =>{
                // .closest retorna o elemento mais proximo que tem a class que passamos
                // do .pizza-item ele vai pegar o valor do atributo data-key
                pegarKey(e)
                askremoveProduct(doc, e)
            })
            console.log(doc.data())
            cartItem.querySelector('img').src = `.${valores.informetionProducts.img}`
            cartItem.querySelector('.cart--item-nome').innerHTML = `${valores.informetionProducts.name}`
            cartItem.querySelector('.cart--item-desc').innerHTML = valores.informetionProducts.description
            document.querySelector('.subtotal span:last-child').innerHTML = `R$ ${valores.valuetotal.toFixed(2)}` 
        }
        
    function backBeginning(){
        window.location.href = "../index.html"
    }
    
    function removeinfi (doc){
        firebase.firestore()
        .collection('banco')
        .doc(doc.id)
        .delete()
        .then(()=>{
            console.log(`Item ${doc.data().informetionProducts.name} deletado!`)
            doc.data().valuetotal = results
            let resulAtual = results
            let b = Math.sign(resulAtual)
                if(b == -1){
                        document.querySelector('.subtotal span:last-child').innerHTML = `R$ ${0}`
                }
        })
    }       
    let results
    let valoratual
    const  askremoveProduct = (doc, e) =>{
        const shoulremove = confirm('Deseja remover o protudo?')
        if(shoulremove == true){
            removeinfi(doc)
            results = valores.valuetotal - modalKey
            valores.valuetotal = results
            e.target.parentNode.parentNode.remove();
        }
        
        document.querySelector('.subtotal span:last-child').innerHTML = `R$ ${valores.valuetotal.toFixed(2)}` 
    }
