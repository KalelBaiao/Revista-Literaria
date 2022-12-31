const inputPesquisar = document.querySelector(".form-pesquisar input")
const todasPublicacoes = document.querySelectorAll(".container-publicacoes article")

inputPesquisar.addEventListener("input", e => {
    const inputValue = e.target.value.trim().toLowerCase()
    const pubs = Array.from(todasPublicacoes)

    pubs
        .filter(pub => !pub.textContent.toLowerCase().includes(inputValue))
        .forEach(pub => {
            pub.classList.remove('publicacao')
            pub.classList.add('hide')
        })

    pubs
        .filter(pub => pub.textContent.toLowerCase().includes(inputValue))
        .forEach(pub => {
            pub.classList.remove('hide')
            pub.classList.add('publicacao')
        })
})

document.querySelector(".icon-lupa").addEventListener("click", () => inputPesquisar.classList.toggle("hide"))