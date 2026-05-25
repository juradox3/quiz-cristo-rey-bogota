import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDbHYxo5U1jxuI07N67ctDmpCCwMx8tEzQ",
    authDomain: "colegio-cristo-rey-bogota.firebaseapp.com",
    projectId: "colegio-cristo-rey-bogota",
    storageBucket: "colegio-cristo-rey-bogota.firebasestorage.app",
    messagingSenderId: "280577830914",
    appId: "1:280577830914:web:8366424c2af3c64d74f71b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function obtenerRanking() {
    try {
        const querySnapshot = await getDocs(collection(db, "resultados"));
        const lista = [];
        querySnapshot.forEach((doc) => {
            lista.push({ id: doc.id, ...doc.data() });
        });
        return lista;
    } catch (e) {
        console.error("Error obteniendo documentos: ", e);
        return [];
    }
}
