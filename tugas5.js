// **Data Produk**
let produkList = [
    { id: 1, nama: "Laptop", harga: 12000000 },
    { id: 2, nama: "Smartphone", harga: 5000000 },
    { id: 4, nama: "Smartwatch", harga: 1500000 },
    { id: 5, nama: "Headphone Bluetooth", harga: 800000 },
    { id: 6, nama: "Keyboard Mechanical", harga: 650000 },
    // minimal 5 kode (tersedia 5 produk awal, id 3 disiapkan untuk penambahan data)
];

// nama fungsi bebas
const eventHandler = {
    // Tempat penyimpanan listener event
    listeners: {},

    // Mendaftarkan event listener (nama fungsi bebas)
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    },

    // Memicu/menjalankan event listener yang terdaftar
    emit(event, ...args) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => callback(...args));
        }
    },

    // Fungsi listener saat produk ditambahkan (nama fungsi bebas)
    onProdukDitambahkan(produk) {
        console.log(`[Event Listener] Notifikasi: Produk "${produk.nama}" (ID: ${produk.id}) berhasil ditambahkan ke katalog.`);
    },

    // Fungsi listener saat produk dihapus (nama fungsi bebas)
    onProdukDihapus(...ids) {
        console.log(`[Event Listener] Notifikasi: Produk dengan ID [${ids.join(', ')}] berhasil dihapus dari katalog.`);
    }
};

// Registrasi Event Listener
eventHandler.on("tambah", eventHandler.onProdukDitambahkan);
eventHandler.on("hapus", eventHandler.onProdukDihapus);

// **Menambahkan Produk dengan Spread Operator**
function tambahProduk(id, nama, harga) {
    const produkBaru = { id, nama, harga };
    // Menambahkan produk baru menggunakan Spread Operator (...)
    produkList = [...produkList, produkBaru];
    // Mengurutkan produk berdasarkan ID secara ascending agar selalu urut
    produkList.sort((a, b) => a.id - b.id);

    // Memicu event listener tambah
    eventHandler.emit("tambah", produkBaru);
}

// **Menghapus Produk dengan Rest Parameter**
function hapusProduk(...id) {
    // Menghapus produk menggunakan Rest Parameter (...id)
    const idsDihapus = id;
    produkList = produkList.filter(produk => !idsDihapus.includes(produk.id));
    // Mengurutkan produk berdasarkan ID secara ascending agar selalu urut
    produkList.sort((a, b) => a.id - b.id);

    // Memicu event listener hapus
    eventHandler.emit("hapus", ...id);
}

// **Menampilkan Produk dengan Destructuring**
function tampilkanProduk() {
    // Memastikan daftar produk selalu terurut berdasarkan ID
    produkList.sort((a, b) => a.id - b.id);

    console.log("==================== DAFTAR PRODUK ====================");
    if (produkList.length === 0) {
        console.log("Katalog produk kosong.");
    } else {
        produkList.forEach(produk => {
            // Menggunakan Destructuring untuk mengambil properti objek produk
            const { id, nama, harga } = produk;
            console.log(`ID: ${id.toString().padEnd(2)} | Nama: ${nama.padEnd(22)} | Harga: Rp ${harga.toLocaleString('id-ID')}`);
        });
    }
    console.log(`Total: ${produkList.length} Produk`);
    console.log("========================================================\n");
}

// Eksekusi kode pengujian sesuai contoh di tugas:
tampilkanProduk();
// contoh penambahan data
tambahProduk(3, "Tablet", 7000000);
tampilkanProduk();
hapusProduk(2);
tampilkanProduk();
