import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js"
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js"
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js"
import { getFirestore, collection, getDocs, collectionGroup, query } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js"


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
// verifica se o usuario está logado
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const user = await auth.currentUser
        verificaADM(user)
        console.log(user, user.emailVerified);
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

            buscaDados()
        } else {
            console.log(`${usuario.nome} não é um Administrador`);
        }
    })
}
// .

const buscaDados = async () => {
    // const pessoas = query(collectionGroup(firestore, 'cadastro'))
    // const queryPessoas = await getDocs(pessoas)
    // queryPessoas.forEach(async (user) => {
    //     const pessoa = user.data()
    //     console.log(pessoa);
    // })

    const arquivos = query(collectionGroup(firestore, 'PDFs'))
    const queryArquivos = await getDocs(arquivos)

    queryArquivos.forEach(async (doc) => {
        const pdf = doc.data()
        console.log(pdf);

        const storageRef = await ref(storage, `Submissões/${pdf.uid}/${pdf.arquivo}/[object File]`)
        getDownloadURL(storageRef)
            .then((url) => {
                const fragment = new DocumentFragment()
                const users = document.querySelector(".users")
                const user = document.createElement("article")
                user.classList.add("user")
                user.innerHTML = `
                    <h2><span>Nome: </span> ${pdf.nome} </h2>
                    <h3><span>E-mail: </span> ${pdf.email}</h3>
                    <a href="${url}" target="_blank"><span>Arquivo: </span>${pdf.arquivo}</a>
                    `
                fragment.append(user)
                users.append(fragment)
            })
            .catch((error) => {
                console.log(error)
            })
    })

}