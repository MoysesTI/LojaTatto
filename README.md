# LojaTatto

https://moysesti.github.io/LojaTatto/

 <input type="text" id="mensagem">
            <ul id="listaNumeros">

            </ul>
      
        <button  onclick="capturarMensagemEVerificar()">confimar</button>

function gerarNumeroAleatorio() {
        return Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    }

    const dados = [
        "123456",
        "987654",
        "456789",
        "321098",
        "876543"
    ];

    while (dados.length < 1000) {
        const novoNumero = gerarNumeroAleatorio();
        if (!dados.includes(novoNumero)) {
            dados.push(novoNumero);
            
        }
        function verificarMensagem(mensagem) {
            return dados.includes(mensagem);
        }
        
        
    }



    function capturarMensagemEVerificar() {
            const mensagemDoUsuario = document.getElementById("mensagem").value;
        
            const mensagemEncontrada = verificarMensagem(mensagemDoUsuario);
        
            if (mensagemEncontrada) {
                
                console.log("A mensagem está no array de dados.");
                const mensagemDoUsuarios = document.getElementById("mensagem").value 
                const listaNumeros = document.getElementById("listaNumeros");
                        const novoItem = document.createElement("li");
                        novoItem.textContent = 'ok';
                        listaNumeros.appendChild(novoItem);
                        mensagemDoUsuarios.value = " "

            } else {
                alert('Item não existe')
            }

        
        
        }
      
