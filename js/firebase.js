// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy
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

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Guardar resultado incluyendo el rol del participante
export async function guardarResultado(nombre, puntaje, rol = "No especificado") {
    try {
        await addDoc(collection(db, "resultados"), {
            nombre: nombre,
            puntaje: Number(puntaje),
            rol: rol,
            fecha: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error guardando en Firebase:", error);
        throw error;
    }
}

// Obtener todos los resultados ordenados para el Ranking
export async function obtenerRanking() {
    try {
        const resultadosRef = collection(db, "resultados");
        const q = query(resultadosRef, orderBy("puntaje", "desc"));
        const querySnapshot = await getDocs(q);
        
        const listaRanking = [];
        querySnapshot.forEach((doc) => {
            listaRanking.push(doc.data());
        });
        return listaRanking;
    } catch (error) {
        console.error("Error obteniendo ranking de Firebase:", error);
        return [];
    }
}