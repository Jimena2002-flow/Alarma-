importScripts("https://www.gstatic.com/firebasejs/10.12.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.3/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyCD9cQ5DIy5GLAgpjSFy9ouNlDXRY97MWs",
    authDomain: "alarma-jotajota.firebaseapp.com",
    projectId: "alarma-jotajota",
    storageBucket: "alarma-jotajota.firebasestorage.app",
    messagingSenderId: "1005649915289",
    appId: "1:1005649915289:web:812277d4995e715f943708",
    measurementId: "G-S937T4RR65"
});

const messaging = firebase.messaging();

// Notificaciones cuando la app está cerrada / background:
messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification || {};
  self.registration.showNotification(title || "Mensaje 💌", {
    body: body || "",
    icon: "icon-192.png"
  });
});

// Opcional: al tocar la notificación, enfoca/abre la app
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const c of clientList) {
        if (c.url.includes("/") && "focus" in c) return c.focus();
      }
      if (clients.openWindow) return clients.openWindow("/");
    })
  );
});
