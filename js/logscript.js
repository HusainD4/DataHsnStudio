document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var errorMessage = document.getElementById("error-message");

    // Validasi username dan password
    if (username === "Husain" && password === "Admin123!") {
        // Arahkan ke halaman admin
        window.location.href = "admin.html";
    } else {
        // Tampilkan pesan error jika login gagal
        errorMessage.textContent = "Username atau Password salah!";
    }
});
