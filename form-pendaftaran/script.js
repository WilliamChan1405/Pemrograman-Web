function validateForm() {
    const nama = document.getElementById('nama');
    const email = document.getElementById('email');
    const umur = document.getElementById('umur');
    const telepon = document.getElementById('telepon');
    const cv = document.getElementById('cv');

    // Nama validasi
    if (nama.value.length < 3 || nama.value.length > 50) {
        alert('Nama harus antara 3-50 karakter');
        return false;
    }

    // Email validasi
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        alert('Email tidak valid');
        return false;
    }

    // Umur validasi
    if (umur.value < 18 || umur.value > 100) {
        alert('Umur harus antara 18-100 tahun');
        return false;
    }

    // Telepon validasi
    const teleponRegex = /^[0-9]{10,12}$/;
    if (!teleponRegex.test(telepon.value)) {
        alert('Nomor telepon harus 10-12 digit angka');
        return false;
    }

    // File validasi
    const allowedTypes = ['text/plain'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(cv.files[0].type)) {
        alert('Hanya file teks (.txt) yang diperbolehkan');
        return false;
    }

    if (cv.files[0].size > maxSize) {
        alert('Ukuran file maksimal 5MB');
        return false;
    }

    return true;
}