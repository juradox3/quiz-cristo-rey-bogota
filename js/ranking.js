import { obtenerRanking } from "./firebase.js";

async function cargarRanking() {
    const containerTop = document.getElementById("top5List");
    const containerAll = document.getElementById("participantsList");

    // Indicador de carga
    if (containerTop) containerTop.innerHTML = "<p>Cargando datos...</p>";

    try {
        const datos = await obtenerRanking();

        // Si no hay datos (base vacía o error en la consulta)
        if (!datos || datos.length === 0) {
            const msg = `<div style="text-align:center;padding:32px;color:#94a3b8;">📭 Aún no hay participantes registrados.</div>`;
            if (containerTop) containerTop.innerHTML = msg;
            if (containerAll) containerAll.innerHTML = msg;
            return;
        }

        // Ordenar por nota descendente
        datos.sort((a, b) => parseFloat(b.nota) - parseFloat(a.nota));

        renderTop5(datos);
        renderTabla(datos);

    } catch (err) {
        console.error("Error crítico al cargar el ranking:", err);
        if (containerTop) containerTop.innerHTML = "Error de conexión.";
    }
}

function notaColor(nota) {
    const n = parseFloat(nota);
    if (n >= 4.5) return "#16a34a";
    if (n >= 3.5) return "#ca8a04";
    return "#dc2626";
}

function medalEmoji(pos) {
    if (pos === 1) return "🥇";
    if (pos === 2) return "🥈";
    if (pos === 3) return "🥉";
    return pos;
}

function renderTop5(datos) {
    const container = document.getElementById("top5List");
    if (!container) return;
    
    container.innerHTML = "";
    datos.slice(0, 5).forEach((p, i) => {
        const pos = i + 1;
        const nota = parseFloat(p.nota || 0).toFixed(1);
        const card = document.createElement("div");
        card.className = "ranking-card";
        card.style.cssText = "display:flex; align-items:center; background:white; border-radius:12px; padding:16px 20px; margin-bottom:12px; box-shadow:0 2px 8px rgba(0,0,0,0.08); border-left:5px solid #e2e8f0; gap:16px;";
        
        card.innerHTML = `
            <div style="font-size:1.5rem;min-width:40px;text-align:center;">${medalEmoji(pos)}</div>
            <div style="flex:1;">
                <div style="font-weight:700;color:#1e293b;">${p.nombre}</div>
                <div style="font-size:11px;color:#64748b;">${p.rol || "Sin rol"}</div>
            </div>
            <div style="text-align:right;">
                <div style="font-weight:800;color:${notaColor(nota)};">${nota}</div>
            </div>
        `;
        container.appendChild(card);
    });
}

function renderTabla(datos) {
    const container = document.getElementById("participantsList");
    if (!container) return;

    container.innerHTML = "";
    datos.forEach((p, i) => {
        const pos = i + 1;
        const nota = parseFloat(p.nota || 0).toFixed(1);
        const row = document.createElement("div");
        row.style.cssText = `display:grid; grid-template-columns:50px 1fr 60px; align-items:center; padding:12px; border-bottom:1px solid #f1f5f9; ${i%2===0?"background:#fff;":"background:#f9fafb;"}`;
        
        row.innerHTML = `
            <div style="text-align:center;font-weight:bold;">${pos}</div>
            <div>${p.nombre}</div>
            <div style="text-align:right;font-weight:bold;color:${notaColor(nota)}">${nota}</div>
        `;
        container.appendChild(row);
    });
}

cargarRanking();
// Recargar cada 30 segundos
setInterval(cargarRanking, 30000);
