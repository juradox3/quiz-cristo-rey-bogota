import { obtenerRanking } from "./firebase.js";

async function cargarRanking() {
    try {
        const datos = await obtenerRanking();

        if (!datos || datos.length === 0) {
            document.getElementById("top5List").innerHTML = "<p>No hay participantes aún.</p>";
            document.getElementById("participantsList").innerHTML = "<p>No hay participantes aún.</p>";
            return;
        }

        datos.sort((a, b) => parseFloat(b.nota) - parseFloat(a.nota));

        // ===== TOP 5 =====
        const top5 = datos.slice(0, 5);
        document.getElementById("top5List").innerHTML = top5.map((p, i) => `
            <div class="r-row">
                <div class="r-cell-pos">#${i + 1}</div>
                <div class="r-cell-info">
                    <div class="r-cell-title">${p.nombre}</div>
                    <div class="r-cell-subtitle">${p.rol || "Participante"}</div>
                </div>
                <div class="r-cell-score">${p.nota}</div>
            </div>
        `).join("");

        // ===== TODOS =====
        document.getElementById("participantsList").innerHTML = datos.map((p, i) => `
            <div class="r-row">
                <div class="r-cell-pos">#${i + 1}</div>
                <div class="r-cell-info">
                    <div class="r-cell-title">${p.nombre}</div>
                    <div class="r-cell-subtitle">${p.rol || "Participante"}</div>
                </div>
                <div class="r-cell-score">${p.nota}</div>
            </div>
        `).join("");

    } catch (e) {
        console.error("Error cargando ranking", e);
    }
}
cargarRanking();

