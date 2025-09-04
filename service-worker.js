self.addEventListener("install", (event) => {
  console.log("Service Worker instalado");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activo");
});

// Función para mostrar notificación
function mostrarNotificacion(titulo, mensaje) {
  self.registration.showNotification(titulo, {
    body: mensaje,
    icon: "icon-192.png"
  });
}

// Lista de alarmas (horas Perú)
const alarmas = [
  { hora: 6, minuto: 0, titulo: "Buenos días 💖", mensaje: "Despierta amor, pensé en ti 🌞" },
  { hora: 10, minuto: 0, titulo: "Cuídate 💧", mensaje: "Recuerda tomar agua mi vida 💕" },
  { hora: 12, minuto: 0, titulo: "Hora del almuerzo 🍲", mensaje: "Ya está cerca el almuerzo amorcito" },
  { hora: 12, minuto: 30, titulo: "Disfruta 💕", mensaje: "Espero que ya estés disfrutando tu comida 😘" }
  { hora: 15, minuto: 0, titulo: "Tómate un descanso ☕", mensaje: "Un cafecito para mi persona favorita" },
  { hora: 18, minuto: 0, titulo: "Atardecer 🌅", mensaje: "Pienso en ti mientras el sol se pone" }
  { hora: 21, minuto: 0, titulo: "Buenas noches 🌙", mensaje: "Dulces sueños mi amor, te amo"}
];

// Revisar cada minuto
setInterval(() => {
  let ahora = new Date();
  let horas = ahora.getHours();
  let minutos = ahora.getMinutes();

  alarmas.forEach(a => {
    if (horas === a.hora && minutos === a.minuto) {
      mostrarNotificacion(a.titulo, a.mensaje);
    }
  });
}, 60000);
