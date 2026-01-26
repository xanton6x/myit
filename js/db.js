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
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import firebaseConfig from "./config.js";

// אתחול Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// פונקציית התנתקות
export async function logoutUser() {
    const auth = getAuth();
    try {
        await signOut(auth);
        window.location.href = "index.html";
    } catch (error) {
        console.error("Error signing out:", error);
    }
}

// יצירת קריאה
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

// משיכת קריאות למשתמש (Dashboard)
export function getMyTickets(email, callback) {
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
    }, (error) => {
        console.error("Admin Fetch Error:", error);
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
        return { success: false };
    }
}
