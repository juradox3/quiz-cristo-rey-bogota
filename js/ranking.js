import { obtenerRanking } from "./firebase.js";

async function cargarRanking() {

    try {

        const datos = await obtenerRanking();

        if (!datos || datos.length === 0) {

            document.getElementById("top5List").innerHTML =
                "<p>No hay datos todavía.</p>";

            document.getElementById("participantsList").innerHTML =
                "<p>No hay participantes todavía.</p>";

            return;
        }

        datos.sort(
            (a, b) => parseFloat(b.nota) - parseFloat(a.nota)
        );

        // ===== TOP 5 =====

        const top5 =
            datos.slice(0, 5);

        document.getElementById("top5List").innerHTML =
            top5.map((p, i) => `
                <div class="ranking-card">
                    <h3>#${i + 1} - ${p.nombre}</h3>
                    <p>${p.rol || "Participante"}</p>
                    <strong>Nota: ${p.nota}</strong>
                </div>
            `).join("");

        // ===== TODOS =====

        document.getElementById("participantsList").innerHTML =
            datos.map((p, i) => `
                <div class="ranking-row">
                    <span>#${i + 1}</span>
                    <span>${p.nombre}</span>
                    <span>${p.rol || "Participante"}</span>
                    <strong>${p.nota}</strong>
                </div>
            `).join("");

    } catch (e) {

        console.error(
            "Error cargando ranking",
            e
        );
    }
}

document.addEventListener(
    "DOMContentLoaded",
    cargarRanking
);
