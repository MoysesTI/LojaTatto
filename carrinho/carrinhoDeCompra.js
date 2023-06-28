




let modalKey = 0

// variavel para controlar a quantidade inicial de pizzas na modal


let tattoQuant = 0

let cart = []

let resultEnd

let descontoFinal

let subtotal

const abrirModal = () => {
    document.querySelector('.tattoWindowArea').style.opacity = 0 // transparente
    document.querySelector('.tattoWindowArea').style.display = 'flex'
    setTimeout(() => document.querySelector('.tattoWindowArea').style.opacity = 1, 150)
}

const mudarQuantidade = () => {
    // Ações nos botões + e - da janela modal
    document.querySelector('.tattoInfo--qtmais').addEventListener('click', () => {
        tattoQuant++
        document.querySelector('.tattoInfo--qt').innerHTML = tattoQuant
    })
    document.querySelector('.tattoInfo--qtmenos').addEventListener('click', () => {
        if(tattoQuant > 1) {
            tattoQuant--
            document.querySelector('.tattoInfo--qt').innerHTML = tattoQuant
        }
    })

    let prices = document.querySelector('.tattoInfo--actualPrice').innerHTML.replace('R$&nbsp;', '')

    let valor = tattoQuant * prices
    // console.log(valor)
}

const preencheDadosDasTatto = (tattoItem, item, index) => {

    tattoItem.setAttribute('data-key', index)
    tattoItem.querySelector('.tatto-item-img img').src = item.img
    tattoItem.querySelector('.tatto-item-price').innerHTML = `R$${item.price.toFixed(2)}`
    tattoItem.querySelector('.tatto-item-name').innerHTML = item.name
    tattoItem.querySelector('.tatto-item-desc').innerHTML = item.description
}

const preencheDadosModal = (item) => {
    document.querySelector('.tattoWindowArea').style.display = 'flex'
    document.querySelector('.tattoInfo--qt').innerHTML = tattoQuant
    document.querySelector('.tattoBig img').src = item.img
    document.querySelector('.tattoInfo h1').innerHTML = item.name
    document.querySelector('.tattoInfo--desc').innerHTML = item.description
    document.querySelector('.tattoInfo--actualPrice').innerHTML = `R$${item.price.toFixed(2)}`
}

const pegarKey = (e) => {
    // .closest retorna o elemento mais proximo que tem a class que passamos
    // do .pizza-item ele vai pegar o valor do atributo data-key
    let key = e.target.closest('.tatto-item').getAttribute('data-key')
    // console.log('Pizza clicada ' + key)
    // console.log(tattoJson[key])

    // garantir que a quantidade inicial de pizzas é 1
    tattoQuant = 1

    // Para manter a informação de qual pizza foi clicada
    modalKey = key

    return key
}

const adicionarNoCarrinho = () => {
    document.querySelector('.tattoInfo--addButton').addEventListener('click', () => {
        // console.log('Adicionar no carrinho')
        document.querySelector('.tattoWindowArea').style.display = 'none'
        // pegar dados da janela modal atual
    	// qual tatto? pegue o modalKey para usar tattoJson[modalKey]
    	// console.log("tatto " + modalKey)
	    // quantidade
    	// console.log("Quant. " + tattoQuant)
        // preco
        let valor = document.querySelector('.tattoInfo--actualPrice').innerHTML.replace('R$', '')
        parseFloat(valor)
        // crie um identificador que jwunte id e tamanho
	    // concatene as duas informacoes separadas por um símbolo, vc escolhe
        let identificador = tattoJson[modalKey]

        // antes de adicionar verifique se ja tem aquele codigo e tamanho
        // para adicionarmos a quantidade
        let key = cart.findIndex( (item) => item.identificador == identificador )
        // console.log(key)

        if(key > -1) {
            // se encontrar aumente a quantidade
            cart[key].qt += tattoQuant
        } else {
            // adicionar objeto tatto no carrinho
            let tatto = {
                identificador,
                id: tattoJson[modalKey].id, // size: size
                qt: tattoQuant,
                price: parseFloat(valor),
                user:{
                    uid: 0 
                }
                
            }
            cart.push(tatto)
            // console.log(tatto)
            // console.log(tatto.qt * tatto.price)
        }
        fecharModal()
        abrirCarrinho()
        atualizarCarrinho()
    })
}


// console.log(cart.length)

const atualizarCarrinho = () => {
    // exibir número de itens no carrinho
	// mostrar ou nao o carrinho
    document.querySelector('.menu-shopping span').innerHTML = cart.length
	if(cart.length > 0) {
		// mostrar o carrinho
		document.querySelector('aside').classList.add('show')

		// zerar meu .cart para nao fazer insercoes duplicadas
		document.querySelector('.cart').innerHTML = ''

        // crie as variaveis antes do for
		subtotal = 0
		let desconto = 0
		let total= 0

        // para preencher os itens do carrinho, calcular subtotal
		for(let i in cart) {
			// use o find para pegar o item por id
			let tattoItem = tattoJson.find( (item) => item.id == cart[i].id )
			// console.log(tattoItem)
            // em cada item pegar o subtotal
        	subtotal += cart[i].price * cart[i].qt
            console.log(cart[i].price)

			// fazer o clone, exibir na telas e depois preencher as informacoes
			let cartItem = document.querySelector('.models .cart--item').cloneNode(true)
			document.querySelector('.cart').append(cartItem)

			let tattoName = `${tattoItem.name}`

			// preencher as informacoes
			cartItem.querySelector('img').src = tattoItem.img
			cartItem.querySelector('.cart--item-nome').innerHTML = tattoName
			cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt
			// document.querySelectorr botoes + e -
			cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
				// console.log('Clicou no botão mais')
				// adicionar apenas a quantidade que esta neste contexto
				cart[i].qt++
				// atualizar a quantidade
				atualizarCarrinho()
			})

			cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
				// console.log('Clicou no botão menos')
				if(cart[i].qt > 1) {
					// subtrair apenas a quantidade que esta neste contexto
					cart[i].qt--
				} else {
					// remover se for zero
					cart.splice(i, 1)
				}

                (cart.length < 1) ? document.querySelector('header').style.display = 'flex' : ''

				// atualizar a quantidade
				atualizarCarrinho()
			})
			document.querySelector('.cart').append(cartItem)
		} // fim do for
		// fora do for
		// calcule desconto 10% e total
		//desconto = subtotal * 0.1
		desconto = subtotal * 0.1
		total = subtotal - desconto
		// exibir na tela os resultados
		// document.querySelectorr o ultimo span do elemento
		document.querySelector('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`
        document.querySelector('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`
		document.querySelector('.totalbig span:last-child').innerHTML = `R$ ${total.toFixed(2)}`
        resultEnd = total
        descontoFinal = desconto
	} else {
		// ocultar o carrinho
		document.querySelector('aside').classList.remove('show')
        document.querySelector('.tatto-area').classList.add('gridContainer')
        document.querySelector('.tatto-area').classList.remove('gridCarrinho')
	}

}

const abrirCarrinho = () => {
    // console.log('Qtd de itens no carrinho ' + cart.length)
    if(cart.length > 0) {
        // mostrar o carrinho
	    document.querySelector('aside').classList.add('show')
        document.querySelector('header').style.display = 'flex' // mostrar barra superior
        document.querySelector('.tatto-area').classList.add('gridCarrinho')
        document.querySelector('.tatto-area').classList.remove('gridContainer')
        fecharModal()
    }

    // exibir aside do carrinho no modo mobile
    document.querySelector('.menu-shopping').addEventListener('click', () => {
        if(cart.length > 0) {
            document.querySelector('aside').classList.add('show')
        }
    })
    
}

document.querySelector('.menu-closer').addEventListener('click', () => {
    if(cart.length > 0) {
        document.querySelector('aside').classList.remove('show')
        document.querySelector('.tatto-area').classList.remove('gridCarrinho')
        document.querySelector('.tatto-area').classList.add('gridContainer')
    }
})
const fecharModal = () => {
    document.querySelector('.tattoInfo--cancelButton').addEventListener('click', () =>{
        document.querySelector('.tattoWindowArea').style.display = 'none'
    })
}


const finalizarCompra = () => {
    document.querySelector('.cart--finalizar').addEventListener('click', () => {
        firebase.auth().onAuthStateChanged((user)=>{ 
            if(user){
            cart.map(uid =>{
                let product = {
                    subtotal: subtotal,
                    desconto:descontoFinal.toFixed(2),
                    valuetotal: subtotal - descontoFinal,
                    user:{
                        uid: user.uid
                    },
                    informetionProducts : uid.identificador
                }
                // console.log(product)
                firebase.firestore()
                .collection('banco')
                .add(product)
                .then(snapshot=>{
                    document.querySelector('aside').classList.remove('show')
                    document.querySelector('header').style.display = 'flex'
                })
            })
            }else{
                alert('Usuario precisa estar logado.')
            }
        })
    })
}

tattoJson.map((item, index) =>{
    
    let tattoItem = document.querySelector('.models .tatto-item').cloneNode(true)

    document.querySelector('.tatto-area').append(tattoItem)
    // preencher os dados de cada tatto
    preencheDadosDasTatto(tattoItem, item, index)
    tattoItem.querySelector('.shopping').addEventListener('click',(e)=>{
        e.preventDefault()
        // console.log('clicou na Tatuagem')

        pegarKey(e)

        abrirModal()


        preencheDadosModal(item)

        document.querySelector('.tattoInfo--qt').innerHTML = tattoQuant
    })
})

    mudarQuantidade()
    adicionarNoCarrinho()
    atualizarCarrinho()
    fecharModal()
    finalizarCompra()