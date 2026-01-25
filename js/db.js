import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import firebaseConfig from "./config.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// פונקציה לשמירת קריאה חדשה
export async function createTicket(title, description, userEmail) {
    try {
        const docRef = await addDoc(collection(db, "tickets"), {
            title: title,
            description: description,
            userEmail: userEmail,
            status: "open",
            createdAt: serverTimestamp(), // חיוני לחישוב SLA
            closedAt: null
        });
        console.log("קריאה נשמרה עם מזהה:", docRef.id);
        return { success: true };
    } catch (e) {
        console.error("שגיאה בהוספת קריאה: ", e);
        return { success: false, error: e };
    }
}

// פונקציה להצגת קריאות של משתמש ספציפי
export function getMyTickets(email, callback) {
    const q = query(collection(db, "tickets"), where("userEmail", "==", email));
    
    // onSnapshot גורם לזה להתעדכן אוטומטית בכל שינוי ב-DB
    return onSnapshot(q, (querySnapshot) => {
        const tickets = [];
        querySnapshot.forEach((doc) => {
            tickets.push({ id: doc.id, ...doc.data() });
        });
        callback(tickets);
    });
}