// Registrar Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker registrado"))
    .catch(err => console.log("Error SW:", err));
}

// Pedir permiso para notificaciones
if (Notification.permission !== "granted") {
  Notification.requestPermission();
}
