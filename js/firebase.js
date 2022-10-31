import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js"
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js"
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js"

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
const firestore = getFirestore(app)
const auth = getAuth(app)

// verifica se o usuario está logado
onAuthStateChanged(auth, (user) => {
    if (user) {
        const user = auth.currentUser
        verificADM(user)
    } else {
        console.log("logue, Por favor!");
    }
})
// .

// verifica se o usuario é um Administrador
const verificADM = async ({ uid }) => {
    const querySnapshot = await getDocs(collection(firestore, "users", uid, "cadastro"));
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        const usuario = doc.data()
        if (usuario.adm == true) {
            const menu = document.querySelector(".menu-mobile")
            const menuPc = document.querySelector(".menu_items")
            const li = document.createElement("li")
            const liPc = document.createElement("li")
            li.innerHTML = `
            <a href="adm.html">
                <i class="bx bx-key icon"></i>
                <span class="text-menu nav-text">ADM</span>
            </a> `
            liPc.innerHTML = `<a href="adm.html" class="items">ADM</a>`
            menu.appendChild(li)
            menuPc.appendChild(liPc)
        } else {
            console.log(`${usuario.nome} não é um Administrador`);
        }
    })
}
// .
