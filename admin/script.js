import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  remove,
  get,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCRYX_sccuZyS6U219jupC3iXuU81SvIk",
  authDomain: "hsnimageview.firebaseapp.com",
  databaseURL: "https://hsnimageview-default-rtdb.firebaseio.com/",
  projectId: "hsnimageview",
  storageBucket: "hsnimageview.appspot.com",
  messagingSenderId: "815454639020",
  appId: "1:815454639020:web:b29867dccb7d9c10676009",
  measurementId: "G-PK7Y8R7TWJ",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const form = document.getElementById("dataForm");
const tableBody = document.getElementById("tableBody");
const toast = document.getElementById("toast");
const modal = document.getElementById("confirmModal");
const confirmBtn = document.getElementById("confirmDelete");
const cancelBtn = document.getElementById("cancelDelete");
let deleteId = null;

// Function to generate the Google Drive embed link
function generateDriveEmbedLink(url) {
  const regex = /\/folders\/([a-zA-Z0-9_-]+)/;
  const match = url.match(regex);
  if (match && match[1]) {
    return `https://drive.google.com/embeddedfolderview?id=${match[1]}#grid`;
  }
  return url;
}

// Show toast notification
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Function to trigger data delete process
function deleteData(id) {
  deleteId = id; // Save the ID to delete
  modal.style.display = "flex"; // Show confirmation modal
}

// Confirm delete
confirmBtn.addEventListener("click", () => {
  if (deleteId) {
    // Remove from Firebase
    remove(ref(database, "links/" + deleteId))
      .then(() => {
        // After removing from Firebase, remove row from table
        const rowToDelete = document.getElementById(deleteId);
        if (rowToDelete) {
          rowToDelete.remove();  // Remove the row from the table
        }
        showToast("Data berhasil dihapus"); // Show success toast
        modal.style.display = "none"; // Hide the confirmation modal
      })
      .catch((error) => {
        console.error("Error menghapus data:", error);
        showToast("Terjadi kesalahan saat menghapus data."); // Show error toast
      });
  }
});

// Cancel delete action
cancelBtn.addEventListener("click", () => {
  modal.style.display = "none"; // Close the confirmation modal
});

// Load data from Firebase
function loadData() {
  get(ref(database, "links")).then((snapshot) => {
    tableBody.innerHTML = ""; // Clear the current table data
    if (snapshot.exists()) {
      const data = snapshot.val(); // Get the data from Firebase
      Object.keys(data).forEach((id) => {
        const { title, link } = data[id]; // Extract title and link
        const embedLink = generateDriveEmbedLink(link); // Convert link if necessary
        
        // Create a new table row for each data entry
        const row = document.createElement("tr");
        row.id = id;  // Set the ID of the row to match the Firebase ID
        row.innerHTML = `
          <td>${title}</td>
          <td><a href="${embedLink}" target="_blank">${link}</a></td>
          <td><button onclick="deleteData('${id}')">Hapus</button></td>
        `;
        tableBody.appendChild(row); // Add the row to the table
      });
    }
  });
}

// Submit form and add data to Firebase
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const link = document.getElementById("link").value;

  // Generate the embedded Google Drive link
  const embedLink = generateDriveEmbedLink(link);
  showToast("Data berhasil disimpan!");

  // Push data to Firebase
  push(ref(database, "links"), { title, link: embedLink }).then(() => {
    form.reset(); // Reset the form after submitting
    loadData(); // Reload the data
  });
});

window.deleteData = deleteData;
window.onload = loadData;


// Access Key Validation (for access to page)
document.getElementById("submitAccessKey").addEventListener("click", function () {
  var accessKey = document.getElementById("accessKey").value;
  var errorMessage = document.getElementById("error-message");

  if (accessKey === "132805") {
    // If correct key, show content and hide form
    document.getElementById("access-container").style.display = "none";
    document.getElementById("page-content").style.display = "block";
  } else {
    // If incorrect key, show error message
    errorMessage.textContent = "Incorrect access key! Please try again.";
  }
});