import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import firebaseConfig from "./config.js";

console.log("קובץ auth.js נטען בהצלחה"); // אם זה לא מופיע ב-Console, הקובץ לא נטען

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginBtn = document.getElementById('login-btn');

if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault(); // מונע מהדף להתרענן
        console.log("לחיצה זוהתה!"); 

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert("הצלחת להתחבר!");
                window.location.href = "dashboard.html";
            })
            .catch((error) => {
                console.error("שגיאה:", error.message);
                alert("שגיאה: " + error.message);
            });
    });
} else {
    console.error("לא נמצא כפתור עם ID בשם login-btn");
}

// בדיקת מצב משתמש (האם הוא מחובר?)
onAuthStateChanged(auth, (user) => {
    const currentPage = window.location.pathname;
    
    if (user) {
        console.log("משתמש מחובר:", user.email);
        // אם המשתמש מחובר והוא בדף הנחיתה, נעביר אותו פנימה
        if (currentPage.endsWith("index.html") || currentPage === "/") {
            window.location.href = "dashboard.html";
        }
    } else {
        // אם המשתמש לא מחובר והוא מנסה להיכנס לדפים פנימיים
        if (currentPage.endsWith("dashboard.html") || currentPage.endsWith("admin.html")) {
            window.location.href = "index.html";
        }
    }
});

// פונקציית התנתקות (נשתמש בה בכפתור ה-Logout)
export function logout() {
    signOut(auth).then(() => {
        window.location.href = "index.html";
    });
}