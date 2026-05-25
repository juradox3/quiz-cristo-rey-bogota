import { obtenerRanking } from "./firebase.js";

async function cargarRanking() {
    console.log("Iniciando carga de ranking...");
    const containerTop = document.getElementById("top5List");
    const containerAll = document.getElementById("participantsList");

    try {
        const datos = await obtenerRanking();
        
        if (!datos || datos.length === 0) {
            const msg = "📭 Aún no hay participantes registrados.";
            if (containerTop) containerTop.innerHTML = msg;
            if (containerAll) containerAll.innerHTML = msg;
            return;
        }

        datos.sort((a, b) => parseFloat(b.nota) - parseFloat(a.nota));
        renderTop5(datos);
        renderTabla(datos);
    } catch (err) {
        console.error("Error al cargar:", err);
    }
}

function notaColor(nota) {
    const n = parseFloat(nota);
    return n >= 4.5 ? "#16a34a" : n >= 3.5 ? "#ca8a04" : "#dc2626";
}

function renderTop5(datos) {
    const container = document.getElementById("top5List");
    container.innerHTML = "";
    datos.slice(0, 5).forEach((p, i) => {
        const card = document.createElement("div");
        card.innerHTML = `<div style="padding:10px; background:white; margin:5px; border-radius:8px;">${p.nombre} - ${p.nota}</div>`;
        container.appendChild(card);
    });
}

function renderTabla(datos) {
    const container = document.getElementById("participantsList");
    container.innerHTML = "";
    datos.forEach(p => {
        const row = document.createElement("div");
        row.innerHTML = `<div style="padding:5px; border-bottom:1px solid #ccc;">${p.nombre} | Nota: ${p.nota}</div>`;
        container.appendChild(row);
    });
}

cargarRanking();
setInterval(cargarRanking, 30000);
