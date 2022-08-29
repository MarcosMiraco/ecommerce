function clicouCategoriaHeader(clicado) {
    let categorias_header = document.querySelectorAll('.header_categorias nav ul li button')
    for (const categorias_botoes of categorias_header) {
        categorias_botoes.parentNode.id = ''
        categorias_botoes.innerText = categorias_botoes.innerText.replace('>', '')
    }

    clicado.parentNode.id = 'categoria_selecionada'

    criarCards(clicado.innerText, false)
    clicado.innerText = '>' + clicado.innerText
}


function clicouCategoriasModal(clicado) {
    let categorias_header = document.querySelectorAll('.modal-dialog nav ul li button')
    for (const categorias_botoes of categorias_header) {
        categorias_botoes.parentNode.id = ''
        categorias_botoes.innerText = categorias_botoes.innerText.replace('>', '')
    }

    clicado.parentNode.id = 'categoria_selecionada'

    criarCards(clicado.innerText, false)
    clicado.innerText = clicado.innerText
}

function clicouCategoriaTag(clicado) {
    let categorias_header = document.querySelectorAll('.header_categorias nav ul li button')
    for (const categorias_botoes of categorias_header) {
        categorias_botoes.parentNode.id = ''
        categorias_botoes.innerText = categorias_botoes.innerText.replace('>', '')
        if (categorias_botoes.innerText === clicado.innerText) {
            categorias_botoes.parentNode.id = 'categoria_selecionada'
            categorias_botoes.innerText = '>' + categorias_botoes.innerText
        }
    }

    criarCards(clicado.innerText, false)
}

function cliqueNoCard(dataBaseId) {
    compras.push(dataBaseId)

    if (idItemsQuantidade[dataBaseId] === undefined) {
        idItemsQuantidade[dataBaseId] = 1
    }
    else {
        idItemsQuantidade[dataBaseId] += 1
    }

    let total = 0
    const carrinhoCompra = document.getElementsByClassName("carrinho_compra")[0]
    carrinhoCompra.innerHTML = ''

    carrinhoCompra.classList.add('ocupado')
    carrinhoCompra.classList.remove('vazio')

    for (const idAtual of [...new Set(compras)]) {

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
        // const botaoRemover = document.createElement('button')
        const div3 = document.createElement('div')
        const botaoAumentar = document.createElement('button')
        const botaoQuantidade = document.createElement('button')
        const botaoDiminuir = document.createElement('button')
    
        tituloCardCompra.innerText = dataBase[idAtual].titulo
        botaoAumentar.innerText = "+"
        botaoQuantidade.innerText = idItemsQuantidade[idAtual]
        botaoDiminuir.innerText = "-"
        preco.innerText = dataBase[idAtual].preco.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
        
        div2.classList.add('div-titulo')
        div3.classList.add('div-quantidade')
        img.src = dataBase[idAtual].endereço
        item.id = `${idAtual}`
        botaoAumentar.id = 'acrescentarItem'
        botaoAumentar.addEventListener('click', () => {
            aumentarItemCarrinho(item)
        })
        botaoQuantidade.id = 'quantidadeItem'
        botaoQuantidade.className = 'quantidadeItem' + idAtual
        botaoDiminuir.id = 'diminuirItem'
        botaoDiminuir.addEventListener('click', () => {
            diminuirItemCarrinho(item)
        })
        
        figure.append(img)
        div1.append(figure)
        div2.append(tituloCardCompra, preco) // botaoRemover
        div3.append(botaoAumentar, botaoQuantidade, botaoDiminuir)
        document.querySelector('#compras ol').append(item)
        document.querySelector('#compras ol').lastChild.append(div1, div2, div3)

        total += dataBase[idAtual].preco * idItemsQuantidade[idAtual]
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

    const categoriasModal = document.getElementsByClassName('hamburguer-conteiner')[0]
    categoriasModal.addEventListener('click', () => {
        const categoriasModal = document.getElementsByClassName('modal-dialog')[0]
        categoriasModal.showModal()
    })

    const categoriasModal2 = document.getElementsByClassName('hamburguer-conteiner')[1]
    categoriasModal2.addEventListener('click', () => {
        const categoriasModal = document.getElementsByClassName('modal-dialog')[0]
        categoriasModal.close()
    })

    const categoriasModalBotoes = document.querySelectorAll('.modal-dialog nav ul li button')
    for (const categoriasBotoes of categoriasModalBotoes) {
        categoriasBotoes.addEventListener('click', function () {
            clicouCategoriasModal(categoriasBotoes)
        })
    }
}

function funcionalidadeTags() {
    const categoriasTags = document.getElementsByClassName('tag')
    console.log(categoriasTags)
    for (const categoriasBotoes of categoriasTags) {
        categoriasBotoes.addEventListener('click', function () {
            clicouCategoriaTag(categoriasBotoes)
        })
    }
}


function inputText() {
    const textoPesquisa = document.getElementById('texto_pesquisa')
    textoPesquisa.addEventListener('keyup', function(event) {
        if (event['key'] == 'Enter') {
            if (textoPesquisa.value === '') {
                return
            }
            
            textoPesquisa.value = textoPesquisa.value.trim()

            if (textoPesquisa.value.includes('---')) {
                mudarTema(textoPesquisa.value)
                textoPesquisa.value = ''
                return
            }

            let categorias_header = document.querySelectorAll('.header_categorias nav ul li button')
            let sinal = true

            for (const categorias_botoes of categorias_header) {
                categorias_botoes.parentNode.id = ''
                categorias_botoes.innerText = categorias_botoes.innerText.replace('>', '')
    
                if (categorias_botoes.innerText.toUpperCase() === textoPesquisa.value.toUpperCase()) {
                    categorias_botoes.parentNode.id = 'categoria_selecionada'
                    categorias_botoes.innerText = '>' + categorias_botoes.innerText
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
        if (textoPesquisa.value === '') {
            return
        }

        textoPesquisa.value = textoPesquisa.value.trim()

        if (textoPesquisa.value.includes('---')) {
            mudarTema(textoPesquisa.value)
            textoPesquisa.value = ''
            return
        }

        let categorias_header = document.querySelectorAll('.header_categorias nav ul li button')
        let sinal = true

        for (const categorias_botoes of categorias_header) {
            categorias_botoes.parentNode.id = ''
            categorias_botoes.innerText = categorias_botoes.innerText.replace('>', '')

            if (categorias_botoes.innerText.toUpperCase() === textoPesquisa.value.toUpperCase()) {
                categorias_botoes.parentNode.id = 'categoria_selecionada'
                categorias_botoes.innerText = '>' + categorias_botoes.innerText
                sinal = false
            }
        }
    
        criarCards(textoPesquisa.value, sinal)
    })
}
