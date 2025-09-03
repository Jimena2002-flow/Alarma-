// Registrar el Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker registrado"));
}

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

// Pedir permiso al cargar la app
Notification.requestPermission().then(permiso => {
  if (permiso !== "granted") {
    alert("Debes permitir notificaciones para que funcionen los avisos.");
  }
});

// Función para programar alarmas por hora
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

// 🔔 Alarmas automáticas (hora local del móvil)
programarAviso(6, 0, "Buenos días ☀️ ¡Empieza tu día conmigo en mente!");
programarAviso(13, 0, "Ya es la 1:00 PM 🍴 Hora de almorzar y pensar en mí 💕");

// ----------------------------------
// Opciones de prueba manual (opcionales)
document.getElementById("notificar").addEventListener("click", () => {
  mostrarAviso("🔔 Aviso inmediato", "Este es un recordatorio manual de prueba");
});

document.getElementById("programar").addEventListener("click", () => {
  setTimeout(() => {
    mostrarAviso("⏰ Aviso de prueba", "Han pasado 10 segundos desde que pulsaste");
  }, 10000);
});
