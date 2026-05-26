import { obtenerRanking } from "./firebase.js";

async function cargarRanking() {

    try {

        const datos = await obtenerRanking();

        if (!datos || datos.length === 0) {
            return;
        }

        datos.sort(
            (a, b) => parseFloat(b.nota) - parseFloat(a.nota)
        );

        // ===== PODIO =====

        const top1 = datos[0];
        const top2 = datos[1];
        const top3 = datos[2];

        if (top1) {
            document.getElementById("pod1Name").textContent = top1.nombre;
            document.getElementById("pod1Score").textContent = top1.nota;
            document.getElementById("pod1Role").textContent =
                top1.rol || "Participante";
        }

        if (top2) {
            document.getElementById("pod2Name").textContent = top2.nombre;
            document.getElementById("pod2Score").textContent = top2.nota;
            document.getElementById("pod2Role").textContent =
                top2.rol || "Participante";
        }

        if (top3) {
            document.getElementById("pod3Name").textContent = top3.nombre;
            document.getElementById("pod3Score").textContent = top3.nota;
            document.getElementById("pod3Role").textContent =
                top3.rol || "Participante";
        }

        // ===== TABLA =====

        const table =
            document.getElementById("tableRowsContainer");

        table.innerHTML = datos.map((p, i) => `
            <div class="r-row">
                <div class="r-cell-pos">#${i + 1}</div>

                <div class="r-cell-info">
                    <div class="r-cell-title">${p.nombre}</div>
                    <div class="r-cell-subtitle">
                        ${p.rol || "Participante"}
                    </div>
                </div>

                <div class="r-cell-score">
                    ${p.nota}
                </div>
            </div>
        `).join("");

     } catch (e) {

        console.error(
            "Error cargando ranking",
            e
        );
    }
}

window.cargarRanking = cargarRanking;
