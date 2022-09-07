const chk = document.getElementById('chk')
var darkMode = localStorage.getItem('darkMode?')


if(darkMode == "true"){
    chk.checked = true
    document.body.classList.add('dark')
} else{
    chk.checked = false
}

chk.addEventListener('click', () => {
    let checkboxTrueOrFalse = chk.checked
    if (checkboxTrueOrFalse == true){
         document.body.classList.add('dark')
        //  console.log(checkboxTrueOrFalse)
         localStorage.setItem('darkMode?', checkboxTrueOrFalse)
    }else{
        document.body.classList.remove('dark')
        localStorage.setItem('darkMode?', checkboxTrueOrFalse)
        // console.log(checkboxTrueOrFalse)
    } 

})