import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } 
    from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import firebaseConfig from "./config.js";

// אתחול Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// לוגיקה לכפתור ההתחברות (אם אנחנו בדף ה-Login)
const loginBtn = document.getElementById('login-btn');
if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // התחברות הצליחה - נעבור לדשבורד
                window.location.href = "dashboard.html";
            })
            .catch((error) => {
                alert("שגיאת התחברות: " + error.message);
            });
    });
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