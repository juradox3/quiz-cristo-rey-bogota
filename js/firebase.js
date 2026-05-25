import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDbHYxo5U1jxuI07N67ctDmpCCwMx8tEzQ",
  authDomain: "colegio-cristo-rey-bogota.firebaseapp.com",
  projectId: "colegio-cristo-rey-bogota",
  storageBucket: "colegio-cristo-rey-bogota.firebasestorage.app",
  messagingSenderId: "280577830914",
  appId: "1:280577830914:web:8366424c2af3c64d74f71b",
  measurementId: "G-H53800V48N"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export async function guardarResultado(
    nombre,
    porcentaje,
    rol,
    nota
) {

    await addDoc(collection(db, "resultados"), {

        nombre,
        porcentaje,
        rol,
        nota,
        fecha: new Date()
    });
}

export async function obtenerRanking() {

    const querySnapshot =
        await getDocs(collection(db, "resultados"));

    let resultados = [];

    querySnapshot.forEach((doc) => {

        resultados.push(doc.data());
    });

    return resultados;
}
