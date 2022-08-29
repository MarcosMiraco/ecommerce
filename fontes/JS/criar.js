
const compras = []
const idItem = []
const cardsSection = document.getElementsByClassName('cards')[0]
const comprasSection = document.getElementById('compras')

function criarCards(texto, sinal) {
    limparCards()
    console.log(sinal)

    for (let item of dataBase) {

        if (!sinal) {
            if (item.tag.toUpperCase() !== texto.toUpperCase() && texto.toUpperCase() !== 'TODOS') {
                continue
            }
        }
        else {
            if (!item.titulo.toUpperCase().includes(texto.toUpperCase())) {
                continue
            }
        }

        const card = document.createElement('div')
        const figure = document.createElement('figure')
        const img = document.createElement('img')
        const figcaption = document.createElement('figcaption')
        const div = document.createElement('div')
        const tituloCard = document.createElement('p')
        const subtituloCard = document.createElement('p')
        const precoCard = document.createElement('p')
        const botaoAdicionar = document.createElement('button')

        card.className = 'card'
        tituloCard.className = 'titulo_card'
        figcaption.className = 'tag'
        subtituloCard.className = 'subtitulo_card'
        precoCard.className = 'preco'
        botaoAdicionar.className = 'carrinho'

        img.src = item.endereço
        figcaption.innerText = item.tag
        tituloCard.innerText = item.titulo
        subtituloCard.innerText = item.descrição
        precoCard.innerText = item.preco.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
        botaoAdicionar.innerText = 'Adicione ao carrinho'
        botaoAdicionar.addEventListener("click", function () {
            cliqueNoCard(item.id)
        })

        card.append(figure, div)
        figure.append(img, figcaption)    
        div.append(tituloCard, subtituloCard, precoCard, botaoAdicionar)
        cardsSection.appendChild(card)
    }
}

function criaOuModificaDivisaPrecoTotal(total) {
    if (document.querySelector('.total_preco') === null) {
        const totalPreco = document.createElement('div')

        const divisao1 = document.createElement('div')
        const divisao2 = document.createElement('div')
        const quantidade = document.createElement('h5')
        const tituloTotal = document.createElement('h5')
        const quantidadeValor = document.createElement('p')
        const totalValor = document.createElement('p')

        totalPreco.className = 'total_preco'

        quantidade.innerText = 'Quantidade:'
        tituloTotal.innerText = 'Total:'
        quantidadeValor.innerText = compras.length
        quantidadeValor.id = 'quantidade_valor'
        totalValor.innerText = total.toLocaleString('pt-br', {style:'currency', currency: 'BRL'})
        totalValor.id = 'total_valor'

        divisao1.append(quantidade, quantidadeValor)
        divisao2.append(tituloTotal, totalValor)
        totalPreco.append(divisao1, divisao2)
        comprasSection.append(totalPreco)
    }
    else {
        document.querySelector('#quantidade_valor').innerText = compras.length
        document.querySelector('#total_valor').innerText = total.toLocaleString('pt-br', {style:'currency', currency: 'BRL'})
    }
}

funcionalidadeHeader()
criarCarrinhoDeCompra()
inputText()
inputButton()
criarCards('Todos', false)
