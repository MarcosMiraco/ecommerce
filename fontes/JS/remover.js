function limparCards() {
    cardsSection.innerHTML = ''
}

function removerItemCarrinho(item) {
    document.querySelector('#compras ol').removeChild(item)

    removerIndexCompras(item)
    removerIndexItem(item)

    let total = 0

    for (const id_atual of idItem) {
        total += dataBase[id_atual].preco
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

function removerIndexItem(item) {
    for (let index = 0; index < idItem.length; index++) {
        if (idItem[index] == item.id) {
            idItem.splice(index, 1)
            break
        }
    }
}

function removerIndexCompras(item) {
    for (let index = 0; index < compras.length; index++) {
        if (compras[index] == item.id) {
            compras.splice(index, 1)
            return
        }
    }
}
