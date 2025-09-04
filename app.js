 import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCD9cQ5DIy5GLAgpjSFy9ouNlDXRY97MWs",
  authDomain: "alarma-jotajota.firebaseapp.com",
  projectId: "alarma-jotajota",
  storageBucket: "alarma-jotajota.firebasestorage.app",
  messagingSenderId: "1005649915289",
  appId: "1:1005649915289:web:812277d4995e715f943708",
  measurementId: "G-S937T4RR65"
};

const app = initializeApp(firebaseConfig);

async function initApp() {
  const statusEl = document.getElementById("status");
  const tokenBox = document.getElementById("tokenBox");
  const tokenText = document.getElementById("tokenText");
  const copyBtn   = document.getElementById("copyToken");
  const testLocal = document.getElementById("testLocal");

  // Registrar service workers
  let swReg = null;
  if ("serviceWorker" in navigator) {
    swReg = await navigator.serviceWorker.register("firebase-messaging-sw.js").catch(err=>{
      console.error("Error SW:", err);
    });
  }

  // Verifica soporte de FCM
  if (!(await isSupported())) {
    statusEl.textContent = "Tu navegador no soporta Web Push 😢";
    return;
  }

  const messaging = getMessaging(app);

  // Pide permiso de notificaciones
  let perm = Notification.permission;
  if (perm !== "granted") perm = await Notification.requestPermission();
  if (perm !== "granted") {
    statusEl.textContent = "Permiso de notificaciones DENEGADO 🚫";
    return;
  }

  // Obtener token FCM
  try {
    const token = await getToken(messaging, {
      vapidKey: "3HUZU6huVKEom2W8A6PeBXC6PxnSfEYXYn4LGiggKWk",
      serviceWorkerRegistration: swReg
    });

    if (token) {
      statusEl.textContent = "Todo listo ✅ La app puede recibir push incluso cerrada.";
      tokenBox.style.display = "block";
      tokenText.textContent = token;
      copyBtn.onclick = () => {
        navigator.clipboard.writeText(token);
        copyBtn.textContent = "¡Copiado!";
        setTimeout(()=>copyBtn.textContent="Copiar token", 1500);
      };
    } else {
      statusEl.textContent = "No se pudo obtener token (¿VAPID configurado?).";
    }
  } catch(e) {
    console.error(e);
    statusEl.textContent = "Error al obtener el token. Revisa consola.";
  }

  // Recibir mensajes en foreground
  onMessage(messaging, (payload) => {
    const { title, body } = payload?.notification || {};
    if (title || body) {
      new Notification(title || "Mensaje 💌", {
        body: body || "",
        icon: "icon-192.png"
      });
    }
  });

  // Botón de prueba local
  testLocal.onclick = () => {
    if (Notification.permission === "granted") {
      new Notification("Prueba local 🔔", { body: "Hola amor 💖", icon: "icon-192.png" });
    }
  };
}

initApp();
