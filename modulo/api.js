'use strict'

async function pesquisarFotos() {
    const url = `http://localhost:3000/fotos`
    const response = await fetch(url)
    const fotos = await response.json()
    return fotos
}

// galeria anttiga para testar o consumo
async function preencherFotos() {
    const fotos = await pesquisarFotos()
    const galeria = document.getElementById('galeria')
    galeria.innerHTML = ''
    fotos.forEach(foto => {
        const novaImg = document.createElement('img')
        novaImg.src = foto.imagem
        galeria.appendChild(novaImg)
    })
}

// carrossel   
let imagens = []
let legendas = []
let currentIndex = 0

async function carregarImagens() {
    const fotos = await pesquisarFotos()
    imagens = fotos.map(foto => foto.imagem)
    legendas = fotos.map(foto => foto.legenda || "nao tem legenda")
    if (imagens.length > 0) {
        mostrarImagem(currentIndex)
    }
}

function mostrarImagem(index) {
    const img = document.getElementById('carrosselImg')
    const legenda = document.getElementById('carrosselLegenda')
    img.src = imagens[index]
    legenda.textContent = legendas[index]
}

document.getElementById('prevBtn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + imagens.length) % imagens.length
    mostrarImagem(currentIndex)
})

document.getElementById('nextBtn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % imagens.length
    mostrarImagem(currentIndex)
})

    preencherFotos()
    carregarImagens()

