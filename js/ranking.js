import { obtenerRanking } from "./firebase.js";

async function cargarRanking() {

    const containerTop =
        document.getElementById("top5List");

    const containerAll =
        document.getElementById("participantsList");

    if (!containerTop || !containerAll) return;

    try {

        const datos = await obtenerRanking();

        datos.sort(
            (a, b) => parseFloat(b.nota) - parseFloat(a.nota)
        );

        containerTop.innerHTML =
            datos.slice(0, 5).map((p, i) => `
                <div style="margin:10px;">
                    ${i + 1}. ${p.nombre} - ${p.nota}
                </div>
            `).join('');

        containerAll.innerHTML =
            datos.map((p, i) => `
                <div style="border-bottom:1px solid #ccc;">
                    ${i + 1}. ${p.nombre} | ${p.nota}
                </div>
            `).join('');

    } catch (e) {

        console.error("Error cargando ranking", e);
    }
}

document.addEventListener(
    "DOMContentLoaded",
    cargarRanking
);
