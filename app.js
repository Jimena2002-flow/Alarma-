// Registrar el Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker registrado"));
}

// Función para mostrar notificación
function mostrarAviso(titulo, mensaje) {
  if (Notification.permission === "granted") {
    new Notification(titulo, {
      body: mensaje,
      icon: "png"
    });
  }
}

// Pedir permiso de notificación al cargar la app
Notification.requestPermission().then(permiso => {
  if (permiso !== "granted") {
    alert("Debes permitir notificaciones para que funcionen los avisos.");
  }
});

// Aviso manual (con botón)
document.getElementById("notificar").addEventListener("click", () => {
  mostrarAviso("🔔 Aviso Local", "Este es un recordatorio desde donde está Jimena Flores");
});

// Aviso programado cada 30 segundos
setInterval(() => {
  mostrarAviso("⏰ Recordatorio", "Este aviso aparece cada 30 segundos");
}, 30000);

// Aviso en una hora específica (ej: 14:30)
function programarAviso(hora, minuto) {
  setInterval(() => {
    const ahora = new Date();
    if (ahora.getHours() === hora && ahora.getMinutes() === minuto && ahora.getSeconds() === 0) {
      mostrarAviso("📌 Aviso programado", `Son las ${hora}:${minuto < 10 ? "0"+minuto : minuto}`);
    }
  }, 1000);
}

// Ejemplo: aviso todos los días a las 14:30
programarAviso(14, 30);
