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

// אתחול
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 1. פונקציה לפתיחת קריאה
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
        console.error("Error:", e);
        return { success: false };
    }
}

// 2. משיכת קריאות למשתמש ספציפי
export function getMyTickets(email, callback) {
    const q = query(
        collection(db, "tickets"), 
        where("userEmail", "==", email), 
        orderBy("createdAt", "desc")
    );
    return onSnapshot(q, (snapshot) => {
        const tickets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(tickets);
    });
}

// 3. משיכת כל הקריאות (עבור ה-Admin)
export function getAllTickets(callback) {
    const q = query(collection(db, "tickets"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
        const tickets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(tickets);
    });
}

// 4. סגירת קריאה
export async function closeTicket(ticketId) {
    try {
        const ticketRef = doc(db, "tickets", ticketId);
        await updateDoc(ticketRef, {
            status: "closed",
            closedAt: serverTimestamp()
        });
        return { success: true };
    } catch (e) {
        return { success: false };
    }
}