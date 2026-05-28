import { obtenerRanking } from "./firebase.js";

async function cargarRanking() {
    try {
        const datos = await obtenerRanking();

        if (!datos || datos.length === 0) return;

        datos.sort((a, b) => parseFloat(b.nota) - parseFloat(a.nota));

        // ===== PODIO (index.html) =====
        const top1 = datos[0], top2 = datos[1], top3 = datos[2];
        if (document.getElementById("pod1Name") && top1) {
            document.getElementById("pod1Name").textContent = top1.nombre;
            document.getElementById("pod1Score").textContent = top1.nota;
            document.getElementById("pod1Role").textContent = top1.rol || "Participante";
        }
        if (document.getElementById("pod2Name") && top2) {
            document.getElementById("pod2Name").textContent = top2.nombre;
            document.getElementById("pod2Score").textContent = top2.nota;
            document.getElementById("pod2Role").textContent = top2.rol || "Participante";
        }
        if (document.getElementById("pod3Name") && top3) {
            document.getElementById("pod3Name").textContent = top3.nombre;
            document.getElementById("pod3Score").textContent = top3.nota;
            document.getElementById("pod3Role").textContent = top3.rol || "Participante";
        }

        // ===== TABLA (ambas páginas) =====
        const filas = datos.map((p, i) => `
            <div class="r-row">
                <div class="r-cell-pos">#${i + 1}</div>
                <div class="r-cell-info">
                    <div class="r-cell-title">${p.nombre}</div>
                    <div class="r-cell-subtitle">${p.rol || "Participante"}</div>
                </div>
                <div class="r-cell-score">${p.nota}</div>
            </div>
        `).join("");

        if (document.getElementById("tableRowsContainer")) {
            document.getElementById("tableRowsContainer").innerHTML = filas;
        }
        if (document.getElementById("participantsList")) {
            document.getElementById("participantsList").innerHTML = filas;
        }


    } catch (e) {
        console.error("Error cargando ranking", e);
    }
}

window.cargarRanking = cargarRanking;
cargarRanking();

window.descargarReporte = function() {
    if (typeof datosRanking === 'undefined' || datosRanking.length === 0) {
        alert("Aún no hay datos cargados.");
        return;
    }

    // Cabeceras del archivo CSV
    let csvContent = "data:text/csv;charset=utf-8,Nombre,Rol,Nota,Porcentaje,Fecha\n";
    
    // Recorremos los datos que ya tienes en memoria
    datosRanking.forEach(p => {
        // Limpiamos datos para evitar errores en Excel
        const nombre = (p.nombre || "Sin nombre").replace(/,/g, "");
        const rol = (p.rol || "Participante").replace(/,/g, "");
        const nota = p.nota || "0";
        const porcentaje = p.porcentaje || "0";
        const fecha = p.fecha || "Sin fecha";
        
        csvContent += `${nombre},${rol},${nota},${porcentaje},${fecha}\n`;
    });

    // Generar la descarga
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Reporte_Ranking_Cristo_Rey.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
