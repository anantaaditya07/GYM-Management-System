// =========================
// Firebase Configuration
// =========================
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Show & Hide Forms
function openForm(formId) {
  document.querySelectorAll(".form-container").forEach(f => f.classList.add("hidden"));
  document.getElementById(formId).classList.remove("hidden");
}

// Login
document.getElementById("loginForm").addEventListener("submit", e => {
  e.preventDefault();
  const email = loginEmail.value;
  const password = loginPassword.value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => alert("Login successful"))
    .catch(err => alert(err.message));
});

// Add Member
document.getElementById("addMemberForm").addEventListener("submit", e => {
  e.preventDefault();
  db.collection("members").add({
    name: memberName.value,
    email: memberEmail.value,
    age: memberAge.value,
    joinedAt: new Date()
  })
  .then(() => alert("Member added successfully"))
  .catch(err => alert(err.message));
});

// Create Bill
document.getElementById("createBillForm").addEventListener("submit", e => {
  e.preventDefault();
  db.collection("bills").add({
    email: billEmail.value,
    amount: billAmount.value,
    date: new Date()
  })
  .then(() => alert("Bill created"))
  .catch(err => alert(err.message));
});

// Assign Package
document.getElementById("assignPackageForm").addEventListener("submit", e => {
  e.preventDefault();
  db.collection("packages").add({
    email: packageEmail.value,
    package: packageType.value,
    assignedAt: new Date()
  })
  .then(() => alert("Package assigned"))
  .catch(err => alert(err.message));
});

// View Receipts
function loadReceipts() {
  db.collection("bills").get().then(snapshot => {
    receiptsList.innerHTML = "";
    snapshot.forEach(doc => {
      let li = document.createElement("li");
      li.textContent = `${doc.data().email} - ₹${doc.data().amount}`;
      receiptsList.appendChild(li);
    });
  });
}
document.getElementById("viewReceipts").addEventListener("click", loadReceipts);

// View Notifications (show packages assigned)
function loadNotifications() {
  db.collection("packages").get().then(snapshot => {
    notificationsList.innerHTML = "";
    snapshot.forEach(doc => {
      let li = document.createElement("li");
      li.textContent = `${doc.data().email} - ${doc.data().package} package`;
      notificationsList.appendChild(li);
    });
  });
}
document.getElementById("viewNotifications").addEventListener("click", loadNotifications);
