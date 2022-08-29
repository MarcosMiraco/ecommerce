function limparCards() {
    cardsSection.innerHTML = ''
}

function diminuirItemCarrinho(item) {
    const quantidadeBotao = document.getElementsByClassName('quantidadeItem' + item.id)[0]

    quantidadeBotao.innerText -= 1
    if (quantidadeBotao.innerText == 0) {
        document.querySelector('#compras ol').removeChild(item)
    }

    removerIndexCompras(item)
    removerIndexItemQuantidade(item)

    let total = 0

    for (const idAtual of Object.keys(idItemsQuantidade)) {
        total += dataBase[idAtual].preco * idItemsQuantidade[idAtual]
    }

    criaOuModificaDivisaPrecoTotal(total)

    if (!compras.length) {

        const carrinhoCompra = document.getElementsByClassName('carrinho_compra')[0]
        carrinhoCompra.innerHTML = ''

        const tituloCompra = document.createElement('h3')
        const subtituloCompra = document.createElement('p')

        carrinhoCompra.classList.remove('ocupado')
        carrinhoCompra.classList.add('vazio')

        tituloCompra.innerText = 'Carrinho Vazio'
        subtituloCompra.innerText = 'Adicione Itens'

        carrinhoCompra.append(tituloCompra, subtituloCompra)
        comprasSection.removeChild(document.querySelector('.total_preco'))
    }
}

function aumentarItemCarrinho(item) {
    const quantidadeBotao = document.getElementsByClassName('quantidadeItem' + item.id)[0]

    quantidadeBotao.innerText = Number(quantidadeBotao.innerText) + 1

    compras.push(Number(item.id))
    idItemsQuantidade[item.id] += 1

    let total = 0

    for (const idAtual of Object.keys(idItemsQuantidade)) {
        total += dataBase[idAtual].preco * idItemsQuantidade[idAtual]
    }

    criaOuModificaDivisaPrecoTotal(total)
}

function removerIndexCompras(item) {
    for (let index = compras.length; index >= 0; index--) {
        if (compras[index] == item.id) {
            compras.splice(index, 1)
            return
        }
    }
}

function removerIndexItemQuantidade(item) {
    for (const indexAtual of Object.keys(idItemsQuantidade)) {
        if (indexAtual == item.id) {
            idItemsQuantidade[indexAtual] -= 1
            if (idItemsQuantidade[indexAtual] === 0) {
                delete idItemsQuantidade[indexAtual]
            }
            return
        }
    }
}
