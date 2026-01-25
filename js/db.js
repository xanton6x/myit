import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    updateDoc, 
    doc, 
    serverTimestamp, 
    query, 
    where, 
    onSnapshot, 
    orderBy 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import firebaseConfig from "./config.js";

// אתחול Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- פונקציות למשתמש רגיל ---

// פתיחת קריאה חדשה
export async function createTicket(title, description, userEmail) {
    try {
        const docRef = await addDoc(collection(db, "tickets"), {
            title: title,
            description: description,
            userEmail: userEmail,
            status: "open",
            createdAt: serverTimestamp(),
            closedAt: null
        });
        return { success: true, id: docRef.id };
    } catch (e) {
        console.error("Error adding ticket: ", e);
        return { success: false, error: e };
    }
}

// משיכת קריאות של משתמש ספציפי
export function getMyTickets(email, callback) {
    const q = query(collection(db, "tickets"), where("userEmail", "==", email), orderBy("createdAt", "desc"));
    return onSnapshot(q, (querySnapshot) => {
        const tickets = [];
        querySnapshot.forEach((doc) => {
            tickets.push({ id: doc.id, ...doc.data() });
        });
        callback(tickets);
    });
}

// --- פונקציות לצוות IT (Admin) ---

// משיכת כל הקריאות במערכת
export function getAllTickets(callback) {
    const q = query(collection(db, "tickets"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (querySnapshot) => {
        const tickets = [];
        querySnapshot.forEach((doc) => {
            tickets.push({ id: doc.id, ...doc.data() });
        });
        callback(tickets);
    });
}

// סגירת קריאה
export async function closeTicket(ticketId) {
    try {
        const ticketRef = doc(db, "tickets", ticketId);
        await updateDoc(ticketRef, {
            status: "closed",
            closedAt: serverTimestamp()
        });
        return { success: true };
    } catch (e) {
        console.error("Error closing ticket: ", e);
        return { success: false };
    }
}