// import { initializeApp } from 'firebase/app'
// import { getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js"
import { getStorage, ref, uploadBytesResumable } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js"
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js"

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


const name = document.getElementById("input-name")
const email = document.getElementById("input-email")
const arquivo = document.getElementById("input-arquivo")
const btnSubimit = document.getElementById("envio")


// Initialize Firebase
const app = initializeApp(firebaseApp)
const form = document.querySelector(".form-contato")
const storage = getStorage(app)

const fireapp = initializeApp(firebaseApp)
const firestore = getFirestore(fireapp)

// console.log(storage);

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    btnSubimit.innerText = "*CARREGANDO*"
    const file = document.querySelector(".file").files[0]

    const storageRef = await ref(storage, `Submissões/${file.name}/${file}`)
    uploadBytesResumable(storageRef, file)
        .then(() => {
            name.value = ''
            email.value = ''
            arquivo.value = ''
            btnSubimit.innerText = "ENVIADO COM SUCESSO!!!"
        }).catch((error) => {
            console.log(error)
        })

    try {
        // setDoc(doc(firestore, "users", "new-user"), data)
        const docRef = await addDoc(collection(firestore, "users"), {
            nome: `${name.value}`,
            email: `${email.value}`,
            arquivo: `${file.name}`
        })
        console.log("Document written with ID: ", docRef.id)
    } catch (e) {
        console.error("Error adding document: ", e)
    }
})