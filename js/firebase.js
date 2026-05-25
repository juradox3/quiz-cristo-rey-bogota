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

apiKey: 
    "AIzaSyDbHYxo5U1jxuI07N67ctDmpCCwMx8tEzQ",

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
    const resultadosRef = collection(db, "resultados");
    
    // Obtenemos los documentos sin el filtro de ordenamiento por ahora
    const querySnapshot = await getDocs(resultadosRef);

    const listaRanking = [];
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Aseguramos que los datos lleguen aunque falte algún campo
        listaRanking.push({
            id: doc.id,
            nombre: data.nombre || "Sin nombre",
            nota: data.nota || 0,
            puntaje: data.puntaje || 0,
            rol: data.rol || "Participante"
        });
    });

    console.log("Datos obtenidos de Firebase:", listaRanking); 
    return listaRanking;
}
