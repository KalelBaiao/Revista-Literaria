// import { initializeApp } from 'firebase/app'
// import { getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getStorage, ref, uploadBytesResumable} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js";

// const form = document.querySelector(".form-contato")

const firebaseApp = {
    apiKey: "AIzaSyCCEFGTE5Cy7dHWpoEV-L-vbaar-kMbD_c",
    authDomain: "revista-literatus.firebaseapp.com",
    projectId: "revista-literatus",
    storageBucket: "revista-literatus.appspot.com",
    messagingSenderId: "637824781668",
    appId: "1:637824781668:web:7f4c8126a8a22436303e71",
    measurementId: "G-FGCTN6KKW0"
}

// Initialize Firebase
const app = initializeApp(firebaseApp)
const form = document.querySelector(".form-contato")
const storage = getStorage(app)
// console.log(storage);

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const file = document.querySelector(".file").files[0]

    const storageRef = ref(storage, `Submissões/${file.name}/${file}`)
    uploadBytesResumable(storageRef, file)
    .then(() => {
        console.log("oi")
    }).catch((error) => {
        console.log(error)
    })
    const name = document.getElementById("input-name")
    name.value = ''
    const email = document.getElementById("input-email")
    email.value = ''
    const arquivo = document.getElementById("input-arquivo")
    arquivo.value = ''
    const btnSubimit = document.getElementById("envio")
    btnSubimit.innerText = "ENVIADO COM SUCESSO!!!"
})
