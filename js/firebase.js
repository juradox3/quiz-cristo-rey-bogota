import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {

    apiKey: "TU_API_KEY",

    authDomain: "TU_AUTH_DOMAIN",

    projectId: "TU_PROJECT_ID",

    storageBucket: "TU_STORAGE_BUCKET",

    messagingSenderId: "TU_MESSAGING_SENDER_ID",

    appId: "TU_APP_ID"
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
