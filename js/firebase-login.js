import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js"
import { getStorage, ref, uploadBytesResumable } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js"
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js"

const firebaseApp = {
    apiKey: "AIzaSyCCEFGTE5Cy7dHWpoEV-L-vbaar-kMbD_c",
    authDomain: "revista-literatus.firebaseapp.com",
    projectId: "revista-literatus",
    storageBucket: "revista-literatus.appspot.com",
    messagingSenderId: "637824781668",
    appId: "1:637824781668:web:7f4c8126a8a22436303e71",
    measurementId: "G-FGCTN6KKW0"
}

// const nome = document.getElementById("input-nome")
// const email = document.getElementById("login-input-email")
// const senha = document.getElementById("cadastro-input-senha")
const btnSubmit = document.getElementById("contato-envio")
const formCadastro = document.querySelector(".form-cadastro")
const formLogin = document.querySelector(".form-login")
const formContato = document.querySelector('.form-contato')
const containerCadastro = document.querySelector(".container-cadastro")
const containerLogin = document.querySelector(".container-login")
const containerContato = document.querySelector(".container-contato")

const app = initializeApp(firebaseApp)
const storage = getStorage(app)
const firestore = getFirestore(app)
const auth = getAuth(app)

// cadatra o usuario
formCadastro.addEventListener("submit", async (e) => {
    e.preventDefault()
    const nome = document.getElementById("input-nome").value
    const email = document.getElementById("cadastro-input-email").value
    const senha = document.getElementById("cadastro-input-senha").value

    createUserWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        })


})
// .


// verifica se o usuario está logado
onAuthStateChanged(auth, (user) => {
    if (user) {
        const user = auth.currentUser
        const displayName = user.displayName
        const email = user.email
        console.log(user)
        const uid = user.uid
        containerContato.classList.remove('none')
        containerLogin.classList.add('none')
        containerCadastro.classList.add('none')
    } else {
        console.log("logue, Por favor!");
        containerContato.classList.add('none')
        containerLogin.classList.remove('none')
        containerCadastro.classList.add('none')
    }
})
// .

// Login
formLogin.addEventListener("submit", async (e) => {
    e.preventDefault()
    const email = document.getElementById("login-input-email")
    const senha = document.getElementById("input-senha")

    signInWithEmailAndPassword(auth, email.value, senha.value)
        .then((userCredential) => {
            const user = userCredential.user
            console.log(user)
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorCode, errorMessage)
        })
})
//

// envia os arquivos 
formContato.addEventListener("submit", async (e) => {
    e.preventDefault()

    btnSubmit.innerText = "*CARREGANDO*"

    const file = document.querySelector(".file").files[0]
    const nome = document.getElementById("input-name")
    const email = document.getElementById("contato-input-email")

    const storageRef = await ref(storage, `Submissões/${file.name}/${file}`)
    uploadBytesResumable(storageRef, file)
        .then(() => {
            nome.value = ''
            email.value = ''
            file.value = ''
            btnSubmit.innerText = "ENVIADO COM SUCESSO!!!"
        }).catch((error) => {
            console.log(error)
        })

    try {
        // setDoc(doc(firestore, "users", "new-user"), data)
        const docRef = await addDoc(collection(firestore, "users"), {
            nome: `${nome.value}`,
            email: `${email.value}`,
            arquivo: `${file.name}`
        })
        console.log("Document written with ID: ", docRef.id)
    } catch (e) {
        console.error("Error adding document: ", e)
    }
})
// .



// botoes links
const btndeslogar = document.getElementById("deslogar")
btndeslogar.addEventListener("click", () => {
    signOut(auth).then(() => {
        location.reload()
    }).catch((error) => {
        console.log(error)
    })
})
const btnCadastrar = document.querySelector(".btn-cadastrar")
btnCadastrar.addEventListener("click", () => {
    containerContato.classList.add('none')
    containerLogin.classList.add('none')
    containerCadastro.classList.remove('none')
})
// .