document.getElementById("submitAccessKey").addEventListener("click", function() {
    var accessKey = document.getElementById("accessKey").value;
    var errorMessage = document.getElementById("error-message");
    var pageContent = document.getElementById("page-content");
    var accessContainer = document.getElementById("access-container");

    // Cek apakah kunci yang dimasukkan benar
    if (accessKey === "132805") {
        // Jika benar, tampilkan konten dan sembunyikan form input
        pageContent.style.display = "block"; // Menampilkan konten
        accessContainer.style.display = "none"; // Menyembunyikan form input
    } else {
        // Jika salah, tampilkan pesan error dan tetap sembunyikan konten
        errorMessage.textContent = "Incorrect access key! Please try again.";
        disableContent();
    }
});

// Fungsi untuk menonaktifkan seluruh konten halaman
function disableContent() {
    var elements = document.querySelectorAll('body *'); // Menyeleksi semua elemen dalam body
    elements.forEach(function(element) {
        if (element.id !== "access-container" && element.id !== "submitAccessKey") {
            element.disabled = true; // Menonaktifkan elemen
            element.style.pointerEvents = "none"; // Menonaktifkan interaksi dengan elemen
        }
    });
}
