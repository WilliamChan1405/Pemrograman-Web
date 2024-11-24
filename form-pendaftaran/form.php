<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Formulir Pendaftaran</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <form id="registrationForm" action="process.php" method="post" enctype="multipart/form-data" onsubmit="return validateForm()">
            <h2>Formulir Pendaftaran</h2>
            
            <div class="form-group">
                <label for="nama">Nama Lengkap</label>
                <input type="text" id="nama" name="nama" required minlength="3" maxlength="50">
            </div>
            
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
            </div>
            
            <div class="form-group">
                <label for="umur">Umur</label>
                <input type="number" id="umur" name="umur" required min="18" max="100">
            </div>
            
            <div class="form-group">
                <label for="telepon">Nomor Telepon</label>
                <input type="tel" id="telepon" name="telepon" required pattern="[0-9]{10,12}">
            </div>
            
            <div class="form-group">
                <label for="cv">Unggah CV (Teks)</label>
                <input type="file" id="cv" name="cv" accept=".txt" required>
            </div>
            
            <button type="submit">Kirim</button>
        </form>
    </div>
    <script src="script.js"></script>
</body>
</html>