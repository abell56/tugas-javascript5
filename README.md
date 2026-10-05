# Tugas 5 JavaScript - Manajemen Produk Toko Online

Proyek ini dibuat untuk memenuhi tugas praktikum **JavaScript Pertemuan 5** mengenai manajemen produk toko online menggunakan fitur-fitur modern JavaScript (ES6+).

---

## 📋 Fitur dan Kebutuhan Tugas

Fitur yang dikembangkan mencakup:
1. **List data produk awal minimal 5**
2. **Menambahkan Produk**
3. **Menghapus Produk**
4. **Menampilkan Semua Produk**

Implementasi menerapkan 4 konsep utama ES6+:
- **Event Listener**: Objek `eventHandler` untuk menangani notifikasi penambahan dan penghapusan produk.
- **Spread Operator (`...`)**: Digunakan dalam fungsi `tambahProduk` untuk menggabungkan produk baru ke array tanpa mutasi langsung.
- **Rest Parameter (`...id`)**: Digunakan dalam fungsi `hapusProduk` untuk menerima satu atau lebih ID produk secara fleksibel.
- **Destructuring**: Digunakan dalam fungsi `tampilkanProduk` untuk membongkar properti `{ id, nama, harga }` dari setiap objek produk.

---

## 📁 Struktur File

- [`tugas5.js`](./tugas5.js) : File kode utama JavaScript sesuai template yang diberikan di PDF.
- [`index.html`](./index.html) : Halaman antarmuka interaktif yang menampilkan tabel data, formulir CRUD, dan terminal log langsung di browser.
- [`README.md`](./README.md) : Dokumentasi tugas dan penjelasan kode.

---

## 💻 Penjelasan Kode

### 1. Data Produk Awal (Minimal 5 Produk)
```javascript
let produkList = [
    { id: 1, nama: "Laptop", harga: 12000000 },
    { id: 2, nama: "Smartphone", harga: 5000000 },
    { id: 4, nama: "Smartwatch", harga: 1500000 },
    { id: 5, nama: "Headphone Bluetooth", harga: 800000 },
    { id: 6, nama: "Keyboard Mechanical", harga: 650000 },
];
```
> *Catatan: ID 3 sengaja disiapkan kosong untuk demonstrasi penambahan produk tablet di langkah pengujian.*

### 2. Event Listener (`eventHandler`)
```javascript
const eventHandler = {
    listeners: {},
    on(event, callback) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    },
    emit(event, ...args) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => callback(...args));
        }
    },
    onProdukDitambahkan(produk) {
        console.log(`📢 [Event Listener] Notifikasi: Produk "${produk.nama}" (ID: ${produk.id}) berhasil ditambahkan ke katalog.`);
    },
    onProdukDihapus(...ids) {
        console.log(`📢 [Event Listener] Notifikasi: Produk dengan ID [${ids.join(', ')}] berhasil dihapus dari katalog.`);
    }
};

eventHandler.on("tambah", eventHandler.onProdukDitambahkan);
eventHandler.on("hapus", eventHandler.onProdukDihapus);
```

### 3. Menambahkan Produk dengan Spread Operator
```javascript
function tambahProduk(id, nama, harga) {
    const produkBaru = { id, nama, harga };
    // Spread operator (...) menyalin seluruh elemen lama dan menambahkan elemen baru
    produkList = [...produkList, produkBaru];
    eventHandler.emit("tambah", produkBaru);
}
```

### 4. Menghapus Produk dengan Rest Parameter
```javascript
function hapusProduk(...id) {
    // Rest parameter (...id) menampung argumen ID yang ingin dihapus ke dalam array
    const idsDihapus = id;
    produkList = produkList.filter(produk => !idsDihapus.includes(produk.id));
    eventHandler.emit("hapus", ...id);
}
```

### 5. Menampilkan Produk dengan Destructuring
```javascript
function tampilkanProduk() {
    console.log("==================== DAFTAR PRODUK ====================");
    if (produkList.length === 0) {
        console.log("Katalog produk kosong.");
    } else {
        produkList.forEach(produk => {
            // Destructuring objek produk untuk mengekstrak id, nama, dan harga
            const { id, nama, harga } = produk;
            console.log(`ID: ${id.toString().padEnd(2)} | Nama: ${nama.padEnd(22)} | Harga: Rp ${harga.toLocaleString('id-ID')}`);
        });
    }
    console.log(`Total: ${produkList.length} Produk`);
    console.log("========================================================\n");
}
```

---

## 🚀 Cara Menjalankan

### Cara 1: Menggunakan Web Browser (Rekomendasi)
1. Buka folder `tugas-javascript5`.
2. Klik ganda file `index.html` (akan terbuka di browser Google Chrome / Microsoft Edge).
3. Anda dapat melihat:
   - Tabel visual interaktif daftar produk.
   - Form untuk menambah dan menghapus produk.
   - Panel terminal output yang menampilkan log `console.log` secara langsung di layar.
   - Tombol **"Jalankan Alur Pengujian Tugas (PDF)"** untuk menjalankan skenario uji persis seperti pada soal.

### Cara 2: Melalui Developer Console Browser
1. Buka file `index.html` di browser.
2. Buka DevTools dengan menekan `F12` atau `Ctrl + Shift + I`.
3. Buka tab **Console** untuk melihat hasil output `console.log` langsung dari JavaScript.

### Cara 3: Melalui Node.js (jika Node.js terpasang)
Jalankan perintah berikut di terminal:
```bash
node tugas5.js
```
atau
```bash
node index.js
```
