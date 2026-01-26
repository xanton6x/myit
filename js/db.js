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
    onSnapshot 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import firebaseConfig from "./config.js";

// אתחול Firebase ו-Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
        return { success: false };
    }
}

// משיכת קריאות למשתמש ספציפי (Dashboard)
export function getMyTickets(email, callback) {
    // השארנו רק where כדי שיעבוד ללא אינדקס כרגע
    const q = query(collection(db, "tickets"), where("userEmail", "==", email));
    return onSnapshot(q, (snapshot) => {
        const tickets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(tickets);
    });
}

// משיכת כל הקריאות (Admin)
export function getAllTickets(callback) {
    const q = query(collection(db, "tickets"));
    return onSnapshot(q, (snapshot) => {
        const tickets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
