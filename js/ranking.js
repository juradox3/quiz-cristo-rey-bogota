import { obtenerRanking } from "./firebase.js";

async function cargarRanking() {

    try {

        const datos = await obtenerRanking();

        if (!datos || datos.length === 0) return;

        datos.sort(
            (a, b) => parseFloat(b.nota) - parseFloat(a.nota)
        );

        // ===== TOP 3 =====

        if (datos[0]) {
            document.getElementById("pod1Name").textContent =
                datos[0].nombre;

            document.getElementById("pod1Score").textContent =
                datos[0].nota;

            document.getElementById("pod1Role").textContent =
                datos[0].rol || "Participante";
        }

        if (datos[1]) {
            document.getElementById("pod2Name").textContent =
                datos[1].nombre;

            document.getElementById("pod2Score").textContent =
                datos[1].nota;

            document.getElementById("pod2Role").textContent =
                datos[1].rol || "Participante";
        }

        if (datos[2]) {
            document.getElementById("pod3Name").textContent =
                datos[2].nombre;

            document.getElementById("pod3Score").textContent =
                datos[2].nota;

            document.getElementById("pod3Role").textContent =
                datos[2].rol || "Participante";
        }

        // ===== TABLA =====

        const table =
            document.getElementById("tableRowsContainer");

        table.innerHTML = "";

        datos.forEach((p, i) => {

            table.innerHTML += `
                <div class="r-row">
                    <div class="r-cell-pos">
                        ${i + 1}
                    </div>

                    <div class="r-cell-info">
                        <div class="r-cell-title">
                            ${p.nombre}
                        </div>

                        <div class="r-cell-subtitle">
                            ${p.rol || "Participante"}
                        </div>
                    </div>

                    <div class="r-cell-score">
                        ${p.nota}
                    </div>
                </div>
            `;
        });

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
