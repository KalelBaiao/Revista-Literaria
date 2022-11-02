// const btnMobile = document.querySelector('.btn-mobile')
// btnMobile.addEventListener('click', () => {
//     const nav = document.querySelector('.Dnav')
//     const hed = document.querySelector('.hed')
//     nav.classList.toggle('active')
//     hed.classList.toggle('active')
// })

// const iconLupa = document.querySelector(".icon-lupa")

// iconLupa.addEventListener('click', () => {
//     const inputPesquisar = document.querySelector(".input-pesquisar")
//     inputPesquisar.classList.toggle('hide')
// })  



const sidebar = document.querySelector(".sidebar")
const toggle = document.querySelector(".toggle")
const searchBtn = document.querySelector(".search-box")
const btnDown = document.querySelector(".btn-down")
const btnDownMobile = document.querySelector(".btn-down-mobile")
const menuAbsolute = document.querySelector(".menu-absolute")
const menuAbsoluteMobile = document.querySelector(".menu-absolute-mobile")

toggle.addEventListener('click', () => {
    sidebar.classList.toggle("close")
})

searchBtn.addEventListener('click', () => {
    sidebar.classList.remove("close")
})

btnDown.addEventListener("click", () => {
    menuAbsolute.classList.toggle("hide")
    btnDown.classList.toggle("bx-rotate-180")
})
btnDownMobile.addEventListener("click", () => {
    menuAbsoluteMobile.classList.toggle("hide")
    btnDownMobile.classList.toggle("bx-rotate-90")
    btnDownMobile.classList.toggle("bx-rotate-270")
})

// modeSwtich.addEventListener('click', () => {
//     document.body.classList.toggle("dark")

//     if (document.body.classList.contains("dark")) {
//         modeText.innerText = "Ligth Mode"
//     }else{
//         modeText.innerText = "Dark Mode"
//     }
// })

