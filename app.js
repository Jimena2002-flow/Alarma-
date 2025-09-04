  // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCD9cQ5DIy5GLAgpjSFy9ouNlDXRY97MWs",
  authDomain: "alarma-jotajota.firebaseapp.com",
  projectId: "alarma-jotajota",
  storageBucket: "alarma-jotajota.firebasestorage.app",
  messagingSenderId: "1005649915289",
  appId: "1:1005649915289:web:812277d4995e715f943708",
  measurementId: "G-S937T4RR65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// === 2) Registrar service workers ===
// (a) SW de caché/opcional para PWA (si no lo tienes, puedes omitir este registro)
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js").catch(()=>{});
  }

// (b) SW especial de Firebase Messaging (clave)
  const swReg = await navigator.serviceWorker.register("firebase-messaging-sw.js");

  // === 3) Mensajería ===
  const statusEl = document.getElementById("status");
  const tokenBox = document.getElementById("tokenBox");
  const tokenText = document.getElementById("tokenText");
  const copyBtn   = document.getElementById("copyToken");
  const testLocal = document.getElementById("testLocal");

  async function initMessaging() {
    const supported = await isSupported();
    if (!supported) {
      statusEl.textContent = "Tu navegador no soporta Web Push 😢";
      return;
    }

    const messaging = getMessaging(app);

    // Pide permiso
    let perm = Notification.permission;
    if (perm !== "granted") {
      perm = await Notification.requestPermission();
    }
    if (perm !== "granted") {
      statusEl.textContent = "Permiso de notificaciones DENEGADO 🚫";
      return;
    }

  // Obtén token del dispositivo (usa VAPID PUBLIC KEY de Firebase)
  try {
    const token = await getToken(messaging, {
      vapidKey: "3HUZU6huVKEom2W8A6PeBXC6PxnSfEYXYn4LGiggKWk",
      serviceWorkerRegistration: swReg
    });

    if (token) {
      statusEl.textContent = "Todo listo ✅ La app puede recibir push incluso cerrada.";
      tokenBox.style.display = "block";
      tokenText.textContent = token; // Para que lo copies y pruebes desde la consola de Firebase
      copyBtn.onclick = () => {
        navigator.clipboard.writeText(token);
        copyBtn.textContent = "¡Copiado!";
        setTimeout(()=>copyBtn.textContent="Copiar token", 1500);
      };
    } else {
      statusEl.textContent = "No se pudo obtener token (¿VAPID configurado?).";
    }
  } catch (e) {
    console.error(e);
    statusEl.textContent = "Error al obtener el token. Revisa consola.";
  }

  // Mensajes recibidos con la app abierta (foreground)
  onMessage(messaging, (payload) => {
    const { title, body } = payload?.notification || {};
    if (title || body) {
      new Notification(title || "Mensaje 💌", {
        body: body || "",
        icon: "icon-192.png"
      });
    }
  });
}

initMessaging();

// Botón de prueba local (no FCM, solo para ver si salen notificaciones)
testLocal.onclick = () => {
  if (Notification.permission === "granted") {
    new Notification("Prueba local 🔔", { body: "Hola amor 💖", icon: "icon-192.png" });
  }
};
