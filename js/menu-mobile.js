const btnMobile = document.querySelector('.btn-mobile')
btnMobile.addEventListener('click', () => {
    const nav = document.querySelector('.Dnav')
    const hed = document.querySelector('.hed')
    nav.classList.toggle('active')
    hed.classList.toggle('active')
})
