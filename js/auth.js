import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import firebaseConfig from "./config.js"; // תיקון נתיב: אם שניהם בתוך תיקיית js

// אתחול Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log("מערכת האימות (Auth) הופעלה");

// לוגיקה לכפתור ההתחברות
const loginBtn = document.getElementById('login-btn');

if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault(); 
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        console.log("מנסה להתחבר...");

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("התחברת בהצלחה!");
                window.location.href = "dashboard.html";
            })
            .catch((error) => {
                console.error("שגיאת התחברות:", error.code);
                alert("שגיאה: " + error.message);
            });
    });
}

// בדיקת מצב משתמש (האם הוא מחובר?) וניתוב דפים
onAuthStateChanged(auth, (user) => {
    const path = window.location.pathname;
    const isLoginPage = path.endsWith("index.html") || path === "/" || path.endsWith("/");

    if (user) {
        console.log("משתמש מחובר:", user.email);
        if (isLoginPage) {
            window.location.href = "dashboard.html";
        }
    } else {
        console.log("אין משתמש מחובר");
        if (!isLoginPage) {
            window.location.href = "index.html";
        }
    }
});

// פונקציית התנתקות
export function logout() {
    signOut(auth).then(() => {
        window.location.href = "index.html";
    }).catch((error) => {
        console.error("שגיאה בהתנתקות:", error);
    });
}