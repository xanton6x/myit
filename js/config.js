// ייבוא הפונקציה מה-CDN של גוגל
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyAYg4yMD9x-P8Z_xQi4qSCKZbHOZNdyq5Q",
  authDomain: "myit-4ed82.firebaseapp.com",
  projectId: "myit-4ed82",
  storageBucket: "myit-4ed82.firebasestorage.app",
  messagingSenderId: "895445734032",
  appId: "1:895445734032:web:d631db04306b1a0c11be15"
};

// אתחול האפליקציה
const app = initializeApp(firebaseConfig);

// ייצוא הקונפיגורציה כדי ש-auth.js יוכל להשתמש בה
export default firebaseConfig;