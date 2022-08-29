const cores = {
    "light": {
        "--cor-texto-padrao": "rgb(0, 0, 0)",
        "--cor-texto-selecionado": "rgb(226, 248, 255)",
        "--cor-texto-secundario-padrao": "rgb(133, 133, 133)",
        "--cor-texto-tags-padrao": "rgb(255, 255, 255)",
        "--cor-texto-descricao-padrao": "rgb(173, 173, 173)",
        "--cor-texto-preco-padrao": "rgb(28, 30, 53)",    
        "--cor-texto-preco-carrinho": "rgb(173, 173, 173)",
        "--cor-fundo-interface-padrao": "rgb(139, 200, 250)",
        "--cor-fundo-padrao": "rgb(255, 255, 255)",
        "--cor-fundo-carrinho-compra-padrao": "rgb(247, 247, 247)",
        "--cor-fundo-tags-padrao": "rgb(43, 112, 168)",
        "--cor-fundo-botao-claro-escuro-padrao": "rgb(0, 139, 194)",
        "--cor-card-borda-padrao": "rgb(240, 240, 240)",
        "--cor-card-borda-encima": "rgb(87, 150, 243)"
        },
    "dark": {
        "--cor-texto-padrao": "rgb(255, 255, 255)",
        "--cor-texto-selecionado": "rgb(99, 180, 204)",
        "--cor-texto-secundario-padrao": "rgb(199, 199, 199)",
        "--cor-texto-tags-padrao": "rgb(235, 235, 235)", 
        "--cor-texto-descricao-padrao": "rgb(184, 184, 184)",
        "--cor-texto-preco-padrao": "rgb(194, 194, 194)",
        "--cor-texto-preco-carrinho": "rgb(173, 173, 173)",
        "--cor-fundo-interface-padrao": "rgb(115, 56, 150)",
        "--cor-fundo-padrao": "rgb(34, 33, 48)",
        "--cor-fundo-carrinho-compra-padrao": "rgb(56, 55, 80)",
        "--cor-fundo-tags-padrao": "rgb(77, 27, 124)",
        "--cor-fundo-botao-claro-escuro-padrao": "rgb(82, 41, 105)",
        "--cor-card-borda-padrao": "rgb(52, 60, 71)",
        "--cor-card-borda-encima": "rgb(138, 43, 226)"
    }
}

const icones = {
    'light': "./img/claro-escuro/sol.png",
    'dark': "./img/claro-escuro/lua.png"
}

const raiz = document.querySelector(':root')
const imagemEscuroClaro = document.getElementById('botao-claro-escuro')
imagemEscuroClaro.addEventListener('click', () => {
    mudarTema(imagemEscuroClaro.dataset.modo)
})
const imagemEscuroClaroModal = document.getElementById('botao-claro-escuro-modal')
imagemEscuroClaroModal.addEventListener('click', () => {
    mudarTema(imagemEscuroClaro.dataset.modo)
})

function mudarTema(modo) {
    modo = modo.replace('---', '') === 'escuro' ? 'dark': modo.replace('---', '') === 'claro' ? 'light' : 'modo invalido'
    imagemEscuroClaro.dataset.modo = modo === 'light' ? 'escuro' : 'claro'

    if (modo === 'modo invalido') {
        return
    }

    for (let [estilo, valor] of Object.entries(cores[modo])) {
        raiz.style.setProperty(estilo, valor)
    }
    imagemEscuroClaro.src = icones[modo]
    imagemEscuroClaroModal.src = icones[modo]
}
