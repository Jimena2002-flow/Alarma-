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
      icon: "icon-192.png"
    });
  }
}

// Pedir permiso de notificación al cargar la app
Notification.requestPermission().then(permiso => {
  if (permiso !== "granted") {
    alert("Debes permitir notificaciones para que funcionen los avisos.");
  }
});

// Aviso manual con botón
document.getElementById("notificar").addEventListener("click", () => {
  mostrarAviso("🔔 Aviso inmediato", "Este es un recordatorio desde tu PWA");
});

// Aviso programado a los 10s (botón de prueba)
document.getElementById("programar").addEventListener("click", () => {
  setTimeout(() => {
    mostrarAviso("⏰ Aviso programado", "Han pasado 10 segundos desde que pulsaste el botón");
  }, 10000);
});

// Avisos automáticos a las 6:00 am y 1:00 pm (hora local del móvil)
function programarAviso(hora, minuto, mensaje) {
  setInterval(() => {
    const ahora = new Date();
    if (
      ahora.getHours() === hora &&
      ahora.getMinutes() === minuto &&
      ahora.getSeconds() === 0
    ) {
      mostrarAviso("📌 Recordatorio", mensaje);
    }
  }, 1000); // revisa cada segundo
}

// Programar horarios (hora local del móvil)
programarAviso(6, 0, "Buenos días ☀️ ¡Empieza tu día con energía!");
programarAviso(13, 0, "Es la 1:00 PM 🍴 Hora de almorzar y pensar en mí 💕");
