function clicouCategoriaHeader(clicado) {
    let categorias_header = document.querySelectorAll('.header_categorias nav ul li button')
    for (const categorias_botoes of categorias_header) {
        categorias_botoes.parentNode.id = ''
    }

    clicado.parentNode.id = 'categoria_selecionada'

    criarCards(clicado.innerText, false)
}

function cliqueNoCard(dataBaseId) {
    compras.push(dataBaseId)
    idItem.push(dataBaseId)

    let total = 0
    const carrinhoCompra = document.getElementsByClassName("carrinho_compra")[0]
    carrinhoCompra.innerHTML = ''

    carrinhoCompra.classList.add('ocupado')
    carrinhoCompra.classList.remove('vazio')

    for (const id_atual of idItem) {

        if (!carrinhoCompra.hasChildNodes()) {
            const lista = document.createElement('ol')
            carrinhoCompra.append(lista)
        }
    
        const item = document.createElement('li')
        const div1 = document.createElement('div')
        const figure = document.createElement('figure')
        const img = document.createElement('img')
        const div2 = document.createElement('div')
        const tituloCardCompra = document.createElement('h4')
        const preco = document.createElement('p')
        const botaoRemover = document.createElement('button')
    
        item.id = `${id_atual}`
        img.src = dataBase[id_atual].endereço
        tituloCardCompra.innerText = dataBase[id_atual].titulo
        preco.innerText = dataBase[id_atual].preco.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
        botaoRemover.innerText = 'Remover item'
        botaoRemover.className = 'remover_item'
        botaoRemover.addEventListener('click', function () {
            removerItemCarrinho(item)
        })

        figure.append(img)
        div1.append(figure)
        div2.append(tituloCardCompra, preco, botaoRemover)
        document.querySelector('#compras ol').append(item)
        document.querySelector('#compras ol').lastChild.append(div1, div2)

        total += dataBase[id_atual].preco
    }

    criaOuModificaDivisaPrecoTotal(total)
}

function funcionalidadeHeader() {
    const categoriasHeader = document.querySelectorAll('.header_categorias nav ul li button')
    for (const categoriasBotoes of categoriasHeader) {
        categoriasBotoes.addEventListener('click', function () {
            clicouCategoriaHeader(categoriasBotoes)
        })
    }
}

function criarCarrinhoDeCompra() {
    const carrinhoCompra = document.createElement('div')
    const tituloCompra = document.createElement('h3')
    const subtituloCompra = document.createElement('p')

    carrinhoCompra.className = 'carrinho_compra'
    carrinhoCompra.classList.add('vazio')

    tituloCompra.innerText = 'Carrinho Vazio'
    subtituloCompra.innerText = 'Adicione Itens'

    document.querySelector('#compras').appendChild(carrinhoCompra)
    carrinhoCompra.append(tituloCompra, subtituloCompra)
}


function inputText() {
    const textoPesquisa = document.getElementById('texto_pesquisa')
    textoPesquisa.addEventListener('keyup', function(event) {
        if (event['key'] == 'Enter') {
            let categorias_header = document.querySelectorAll('.header_categorias nav ul li button')
            let sinal = true

            for (const categorias_botoes of categorias_header) {
                categorias_botoes.parentNode.id = ''
    
                if (categorias_botoes.innerText.toUpperCase() === textoPesquisa.value.toUpperCase()) {
                    categorias_botoes.parentNode.id = 'categoria_selecionada'
                    sinal = false
                }
            }

            criarCards(textoPesquisa.value, sinal)
        }
    })
}

function inputButton() {
    const textoPesquisa = document.getElementById('texto_pesquisa')
    const buttonPesquisa = document.getElementsByClassName('botao_pesquisar')[0]

    buttonPesquisa.addEventListener('click', function() {
        let categorias_header = document.querySelectorAll('.header_categorias nav ul li button')
        let sinal = true

        for (const categorias_botoes of categorias_header) {
            categorias_botoes.parentNode.id = ''

            if (categorias_botoes.innerText.toUpperCase() === textoPesquisa.value.toUpperCase()) {
                categorias_botoes.parentNode.id = 'categoria_selecionada'
                sinal = false
            }
        }
    
        criarCards(textoPesquisa.value, sinal)
    })
}
