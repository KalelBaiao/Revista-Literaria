import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail, sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js"
import { getStorage, ref, uploadBytesResumable } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js"
import { getFirestore, collection, addDoc, getDoc, doc, getDocs } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js"

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
const mensagensJs = document.querySelector(".mensagens-js")

const app = initializeApp(firebaseApp)
const storage = getStorage(app)
const firestore = getFirestore(app)
const auth = getAuth(app)


// verifica se o usuario está logado
onAuthStateChanged(auth, (user) => {
    if (user) {
        containerContato.classList.remove('none')
        containerLogin.classList.add('none')
        containerCadastro.classList.add('none')
        const user = auth.currentUser

        console.log(user, user.emailVerified);

        mensagensJs.classList.remove("erro")

        if (user.emailVerified == false) {
            sendEmailVerification(user).then(() => {
                mensagensJs.innerHTML = "Verique seu e-mail para autentica-lo. <br> verifique a caixa de Spam. <br> Obs: atualize a página após a verificação"
                mensagensJs.classList.remove("none")
            })
        } else {
            mensagensJs.classList.add("none")
        }
    } else {
        containerContato.classList.add('none')
        containerLogin.classList.remove('none')
        containerCadastro.classList.add('none')

        mensagensJs.innerText = "Cadastre-se e/ou Logue"
        mensagensJs.classList.remove("none")
    }
})
// .

// cadatra o usuario
formCadastro.addEventListener("submit", async (e) => {
    e.preventDefault()
    const nome = document.getElementById("input-nome")
    const email = document.getElementById("cadastro-input-email")
    const senha = document.getElementById("cadastro-input-senha")
    const Vnome = nome.value
    const Vemail = email.value
    const Vsenha = senha.value

    createUserWithEmailAndPassword(auth, Vemail, Vsenha)
        .then(async (userCredential) => {
            const user = userCredential.user;
            console.log(user)

            try {
                const user = auth.currentUser
                const docRef = addDoc(collection(firestore, "users", user.uid, "cadastro"), {
                    nome: `${Vnome}`,
                    email: `${Vemail}`,
                    adm: false
                })
                console.log("Document written with ID: ", docRef.id)
            } catch (error) {
                console.error("Error adding document: ", error)
                mensagensJs.innerHTML = `Falha no cadastro! Por favor atualize a página e tente novamente. <br> ${error.code}`
                mensagensJs.classList.remove("none")
                mensagensJs.classList.add("erro")
            }
        })
        .catch((error) => {
            mensagensJs.classList.add("erro")
            if (senha.value.length < 6) {
                mensagensJs.innerText = "Sua senha deve ter no mínimo 6 carateres"
                mensagensJs.classList.remove("none")
            } else if (error.code == "auth/email-already-in-use") {
                mensagensJs.innerText = "Usuário já cadastrado! faça login."
                mensagensJs.classList.remove("none")
            } else {
                mensagensJs.innerHTML = `Falha no cadastro! Por favor atualize a página e tente novamente. <br> ${error.code}`
                mensagensJs.classList.remove("none")
            }
            console.log(error.code)
        })

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
            console.log(error.code)
            mensagensJs.classList.add("erro")
            if (error.code == "auth/wrong-password") {
                mensagensJs.innerText = "Senha Incorreta!"
                mensagensJs.classList.remove("none")
            } else if (error.code == "auth/user-not-found") {
                mensagensJs.innerText = "Usuario não cadastrato. Por favor verifique seus dados ou cadastre-se."
                mensagensJs.classList.remove("none")
            } else if (error.code == "auth/too-many-requests") {
                mensagensJs.innerText = "Muitas requisições em sequência. atualize a página e tente novamente."
                mensagensJs.classList.remove("none")
            } else {
                mensagensJs.innerText = `${error.code}`
            }
        })
})
//

// envia os arquivos 
formContato.addEventListener("submit", async (e) => {
    e.preventDefault()

    btnSubmit.innerText = "*CARREGANDO*"
    const user = auth.currentUser
    console.log(user, user.emailVerified);
    const email = user.email
    console.log(email);

    if (user.emailVerified) {
        const file = document.querySelector(".file").files[0]
        const nome = document.getElementById("input-name")
        const email = user.email

        const storageRef = await ref(storage, `Submissões/${user.uid}/${file.name}/${file}`)
        uploadBytesResumable(storageRef, file)
            .then(() => {
                nome.value = ''
                file.value = ''
                btnSubmit.innerText = "ENVIADO COM SUCESSO!!!"

            }).catch((error) => {
                console.log(error.code)
                mensagensJs.innerHTML = `Falha no envio! Por favor atualize a página e tente novamente. <br> ${error.code}`
                mensagensJs.classList.remove("none")
                mensagensJs.classList.add("erro")
            })

        try {
            // setDoc(doc(firestore, "users", "new-user"), data)
            const docRef = await addDoc(collection(firestore, "users", user.uid, "PDFs"), {
                nome: `${nome.value}`,
                email: `${email}`,
                arquivo: `${file.name}`,
                uid: `${user.uid}`
            })
            console.log("Document written with ID: ", docRef.id)
        } catch (e) {
            mensagensJs.innerHTML = `Falha no envio! Por favor atualize a página e tente novamente. <br> ${e.code}`
            mensagensJs.classList.remove("none")
            mensagensJs.classList.add("erro")
        }
    } else {
        mensagensJs.innerHTML = `E-mail não autenticado! Por favor verique seu e-mail para autenticação. <br> Obs: Talvez esteja na caixa de Spam.`
        mensagensJs.classList.remove("none")
        mensagensJs.classList.add("erro")
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

const btnEsqueceuSenha = document.querySelector(".btn-esqueceu-senha")
btnEsqueceuSenha.addEventListener("click", () => {
    const email = document.getElementById("login-input-email")
    sendPasswordResetEmail(auth, email.value)
        .then(() => {
            mensagensJs.innerHTML = "Confirmação enviada. Clique no link enviado ao e-mail cadastrado. <br> Obs: vefique a caixa de Spam."
            mensagensJs.classList.remove("none")
            mensagensJs.classList.remove("erro")
        })
        .catch((error) => {
            console.log(error.code);
            mensagensJs.classList.add("erro")
            if (error.code == "auth/missing-email") {
                mensagensJs.innerText = "Preencha a caixa de E-mail!"
                mensagensJs.classList.remove("none")
            } else if (error.code == "auth/user-not-found") {
                mensagensJs.innerText = "Usuario não cadastrato. Por favor verifique seus dados ou cadastre-se."
                mensagensJs.classList.remove("none")
            } else {
                mensagensJs.innerText = `${error.code}`
            }
        })
})
// .