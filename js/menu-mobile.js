const btnMobile = document.querySelector('.btn-mobile')
btnMobile.addEventListener('click', () => {
    const nav = document.querySelector('.Dnav')
    const hed = document.querySelector('.hed')
    nav.classList.toggle('active')
    hed.classList.toggle('active')
})

const iconLupa = document.querySelector(".icon-lupa")

iconLupa.addEventListener('click', () => {
    const inputPesquisar = document.querySelector(".input-pesquisar")
    inputPesquisar.classList.toggle('hide')
})