import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import firebaseConfig from "./js/config.js";

// שאר הקוד שכתבנו קודם...

console.log("קובץ auth.js נטען בהצלחה"); // אם זה לא מופיע ב-Console, הקובץ לא נטען

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginBtn = document.getElementById('login-btn');

if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault(); // מונע מהדף להתרענן
        console.log("לחיצה זוהתה!"); 


// לוגיקה לכפתור ההתחברות (אם אנחנו בדף ה-Login)
if (loginBtn) {
    console.log("כפתור ההתחברות זוהה בהצלחה"); // בדיקה שהקוד רץ
    loginBtn.addEventListener('click', () => {
>>>>>>> 8037dd24a6dba4b8b5cdab01c993a668517c0a3a
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        console.log("מנסה להתחבר עם:", email);

        signInWithEmailAndPassword(auth, email, password)

            .then(() => {
                alert("הצלחת להתחבר!");
                window.location.href = "dashboard.html";
            })
            .catch((error) => {
                console.error("שגיאה:", error.message);

            .then((userCredential) => {
                console.log("הצלחה!");
                window.location.href = "dashboard.html";
            })
            .catch((error) => {
                console.error("קוד שגיאה:", error.code);
>>>>>>> 8037dd24a6dba4b8b5cdab01c993a668517c0a3a
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
