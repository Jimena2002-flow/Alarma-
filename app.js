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

