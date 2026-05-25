import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    orderBy
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {

    apiKey: "TU_API_KEY",

    authDomain:
        "colegio-cristo-rey-bogota.firebaseapp.com",

    projectId:
        "colegio-cristo-rey-bogota",

    storageBucket:
        "colegio-cristo-rey-bogota.firebasestorage.app",

    messagingSenderId:
        "280577830914",

    appId:
        "1:280577830914:web:8366424c2af3c64d74f71b"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export async function guardarResultado(
    nombre,
    puntaje,
    rol,
    nota
) {

    await addDoc(collection(db, "resultados"), {

        nombre,
        puntaje,
        rol,
        nota,
        fecha: new Date().toISOString()
    });
}

export async function obtenerRanking() {

    const resultadosRef =
        collection(db, "resultados");

    const q =
        query(resultadosRef,
        orderBy("puntaje", "desc"));

    const querySnapshot =
        await getDocs(q);

    const listaRanking = [];

    querySnapshot.forEach((doc) => {

        listaRanking.push(doc.data());
    });

    return listaRanking;
}
