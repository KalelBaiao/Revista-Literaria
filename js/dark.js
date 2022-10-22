const modeSwtich = document.querySelector(".toggle-switch")
const modeText = document.querySelector(".mode-text")
var darkMode = localStorage.getItem('darkMode?')
// darkMode = "false"
// darkMode = "true"

if (darkMode == "true") {
    modeSwtich.classList.add('check')
    document.body.classList.add('dark')
} else {
    modeSwtich.classList.remove('check')
}

modeSwtich.addEventListener('click', () => {
    modeSwtich.classList.toggle('check')

    let checkboxTrueOrFalse = modeSwtich.classList.contains("check")
    // console.log(checkboxTrueOrFalse);
    if (checkboxTrueOrFalse == true) {
        document.body.classList.add('dark')
        modeSwtich.classList.add('check')
        //  console.log(checkboxTrueOrFalse)
        localStorage.setItem('darkMode?', checkboxTrueOrFalse)
    } else {
        document.body.classList.remove('dark')
        localStorage.setItem('darkMode?', checkboxTrueOrFalse)
        // console.log(checkboxTrueOrFalse)
        modeSwtich.classList.remove('check')
    }
    // if (document.body.classList.contains("dark")) {
    //     modeText.innerText = "Ligth Mode"
    // } else {
    //     modeText.innerText = "Dark Mode"
    // }

})