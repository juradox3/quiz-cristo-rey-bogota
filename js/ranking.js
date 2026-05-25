import { obtenerRanking } from "./firebase.js";
 
// ─── Helpers ────────────────────────────────────────────────────────────────
 
function medalEmoji(pos) {
    if (pos === 1) return "🥇";
    if (pos === 2) return "🥈";
    if (pos === 3) return "🥉";
    return `#${pos}`;
}
 
function notaColor(nota) {
    const n = parseFloat(nota);
    if (n >= 4.5) return "#16a34a";   // verde
    if (n >= 3.5) return "#ca8a04";   // amarillo
    return "#dc2626";                  // rojo
}
 
// ─── Render Top 5 ───────────────────────────────────────────────────────────
 
function renderTop5(participantes) {
    const container = document.getElementById("top5List");
    container.innerHTML = "";
 
    const top5 = participantes.slice(0, 5);
 
    top5.forEach((p, i) => {
        const pos = i + 1;
        const nota = parseFloat(p.nota).toFixed(1);
        const card = document.createElement("div");
        card.className = "ranking-card";
        card.style.cssText = `
            display: flex;
            align-items: center;
            background: white;
            border-radius: 12px;
            padding: 16px 20px;
            margin-bottom: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            border-left: 5px solid ${pos === 1 ? "#f59e0b" : pos === 2 ? "#94a3b8" : pos === 3 ? "#b45309" : "#e2e8f0"};
            gap: 16px;
        `;
 
        card.innerHTML = `
            <div style="font-size: 2rem; min-width: 48px; text-align: center;">${medalEmoji(pos)}</div>
            <div style="flex: 1;">
                <div style="font-weight: 700; font-size: 1rem; color: #1e293b;">${p.nombre}</div>
                <span class="meta-tag">${p.rol || "—"}</span>
            </div>
            <div style="text-align: right;">
                <div style="font-size: 1.4rem; font-weight: 800; color: ${notaColor(nota)};">${nota}</div>
                <div style="font-size: 11px; color: #94a3b8;">${p.puntaje}%</div>
            </div>
        `;
 
        container.appendChild(card);
    });
}
 
// ─── Render Tabla Completa ───────────────────────────────────────────────────
 
function renderTabla(participantes) {
    const container = document.getElementById("participantsList");
    container.innerHTML = "";
 
    participantes.forEach((p, i) => {
        const pos = i + 1;
        const nota = parseFloat(p.nota).toFixed(1);
 
        const row = document.createElement("div");
        row.style.cssText = `
            display: grid;
            grid-template-columns: 60px 1fr 80px;
            align-items: center;
            padding: 12px 16px;
            border-bottom: 1px solid #f1f5f9;
            background: ${i % 2 === 0 ? "white" : "#fafafa"};
        `;
 
        row.innerHTML = `
            <div style="font-weight: 700; color: #64748b; text-align: center;">${medalEmoji(pos)}</div>
            <div>
                <div style="font-weight: 600; color: #1e293b; font-size: 0.9rem;">${p.nombre}</div>
                <span class="table-meta">${p.rol || "—"}</span>
            </div>
            <div style="text-align: right; font-weight: 800; font-size: 1rem; color: ${notaColor(nota)};">${nota}</div>
        `;
 
        container.appendChild(row);
    });
}
 
// ─── Estado de carga ─────────────────────────────────────────────────────────
 
function mostrarCargando() {
    const top5 = document.getElementById("top5List");
    const lista = document.getElementById("participantsList");
    const msg = `<div style="text-align:center; padding: 32px; color: #94a3b8; font-size: 0.95rem;">⏳ Cargando datos...</div>`;
    top5.innerHTML = msg;
    lista.innerHTML = msg;
}
 
function mostrarError(err) {
    console.error("Error al cargar el ranking:", err);
    const msg = `<div style="text-align:center; padding: 32px; color: #dc2626;">❌ No se pudo cargar el ranking. Revisa la consola para más detalles.</div>`;
    document.getElementById("top5List").innerHTML = msg;
    document.getElementById("participantsList").innerHTML = msg;
}
 
// ─── Init ────────────────────────────────────────────────────────────────────
 
async function cargarRanking() {
    mostrarCargando();
 
    try {
        const datos = await obtenerRanking();
 
        if (!datos || datos.length === 0) {
            const msg = `<div style="text-align:center; padding: 32px; color: #94a3b8;">📭 Aún no hay participantes registrados.</div>`;
            document.getElementById("top5List").innerHTML = msg;
            document.getElementById("participantsList").innerHTML = msg;
            return;
        }
 
        // Ordenar por nota descendente (ya viene ordenado por puntaje desde Firebase,
        // pero re-ordenamos por nota para mayor precisión)
        datos.sort((a, b) => parseFloat(b.nota) - parseFloat(a.nota));
 
        renderTop5(datos);
        renderTabla(datos);
 
    } catch (err) {
        mostrarError(err);
    }
}
 
// Cargar al iniciar y refrescar cada 30 segundos
cargarRanking();
setInterval(cargarRanking, 30000);
