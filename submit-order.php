<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $service = $_POST['serviceDropdown'];
    $date = $_POST['date'];
    $address = $_POST['address'];
    $phone = $_POST['phone'];
    $payment = $_POST['payment'];
    $price = $_POST['price'];

    // Recipient's email address
    $to = 'layananhsnstudio@gmail.com';

    // Subject of the email
    $subject = 'Order Baru - HSN Studio';

    // Message content
    $message = "
        <html>
        <head>
            <title>Order Baru</title>
        </head>
        <body>
            <h2>Informasi Order:</h2>
            <p><strong>Layanan:</strong> $service</p>
            <p><strong>Tanggal Acara:</strong> $date</p>
            <p><strong>Alamat:</strong> $address</p>
            <p><strong>Nomor Telepon:</strong> $phone</p>
            <p><strong>Metode Pembayaran:</strong> $payment</p>
            <p><strong>Biaya:</strong> Rp. $price</p>
        </body>
        </html>
    ";

    // Set the headers for the email
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";

    // Additional headers
    $headers .= "From: no-reply@hsnstudio.com" . "\r\n";

    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        echo "Pesanan Anda telah berhasil dikirim. Kami akan segera menghubungi Anda.";
    } else {
        echo "Terjadi kesalahan dalam pengiriman pesanan. Silakan coba lagi.";
    }
}
?>
