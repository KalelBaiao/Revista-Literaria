import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js"
import { getStorage, ref, uploadBytesResumable, list } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js"
import { getFirestore, collection, addDoc, getDoc, doc, getDocs, query } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js"


const firebaseApp = {
    apiKey: "AIzaSyCCEFGTE5Cy7dHWpoEV-L-vbaar-kMbD_c",
    authDomain: "revista-literatus.firebaseapp.com",
    projectId: "revista-literatus",
    storageBucket: "revista-literatus.appspot.com",
    messagingSenderId: "637824781668",
    appId: "1:637824781668:web:7f4c8126a8a22436303e71",
    measurementId: "G-FGCTN6KKW0"
}

const app = initializeApp(firebaseApp)
const storage = getStorage(app)
const firestore = getFirestore(app)
const auth = getAuth(app)

var pessoas = {}

// verifica se o usuario está logado
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const user = await auth.currentUser
        verificaADM(user)
    } else {
        console.log("logue, Por favor!");
    }
})
// .

// verifica se o usuario é um Administrador
const verificaADM = async ({ uid }) => {
    const querySnapshot = await getDocs(collection(firestore, "users", uid, "cadastro"));
    querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        const usuario = doc.data()
        if (usuario.adm == true) {
            console.log(`${usuario.nome} é um Administrador`)

            const menu = document.querySelector(".menu-mobile")
            const li = document.createElement("li")
            li.innerHTML = `
            <a href="adm.html">
                <i class="bx bx-key icon"></i>
                <span class="text-menu nav-text">ADM</span>
            </a> `
            menu.appendChild(li)

            buscaDados()
        } else {
            console.log(`${usuario.nome} não é um Administrador`);
        }
    })
}
// .

const buscaDados = async () => {
    const query = await getDocs(collection(firestore, "users"));
    query.forEach(async (doc) => {
        const uid = doc.id
        const querySnapshot = await getDocs(collection(firestore, "users", uid, "cadastro"))
        querySnapshot.forEach((d) => {
            pessoas = d.data()
        })
        console.log(pessoas);

    })
}


