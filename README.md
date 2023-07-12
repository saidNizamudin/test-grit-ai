# TEST FRONTEND GRIT-AI

Nama: Said Nizamudin

## Keterangan Folder

Repository ini berisi solusi untuk uji coba frontend GRIT-AI. Terdapat tiga file utama:

1. **soal_pseudocode**: File ini berisi solusi untuk pertanyaan-pertanyaan pseudocode dalam bahasa Python.

2. **soal_utama**: Folder ini berisi solusi utama untuk uji coba, kecuali bagian `testdebug`. Di dalam folder ini, terdapat dua subfolder:

   - **client**: Folder ini berisi solusi sisi klien yang diimplementasikan menggunakan React.
   - **server**: Folder ini berisi solusi sisi server yang diimplementasikan menggunakan Node.js dan Express.

3. **testdebug**: Folder ini berisi file `testdebug.html` yang sudah berfungsi, beserta readme yang menjelaskan setiap baris kode yang tidak digunakan, salah, atau menyebabkan bug.

## Cara Menjalankan Soal Utama

Pastikan Anda telah menginstal Node.js dan dependensi lainnya yang diperlukan untuk menjalankan program React dan Node.js.

Berikut ini adalah langkah-langkah lengkap dalam menjalankan kode di terminal:

1. Salin repository dengan menggunakan perintah berikut:

   ```shell
   git clone https://github.com/saidNizamudin/test-grit-ai.git
   ```

2. Masuk ke dalam direktori `server` dengan perintah:

   ```shell
   cd test-grit-ai/server
   ```

3. Install semua dependensi server dengan menjalankan perintah:

   ```shell
   npm install
   ```

4. Jalankan server dengan perintah:

   ```shell
   npm run dev
   ```

5. Buka jendela terminal baru dan masuk ke dalam direktori `client` dengan perintah:

   ```shell
   cd ../client
   ```

6. Install semua dependensi client dengan menjalankan perintah:

   ```shell
   yarn
   ```

7. Jalankan client dengan perintah:

   ```shell
   yarn run dev
   ```

8. Buka browser dan akses `http://localhost:5173` untuk melihat hasilnya.

Jika Anda mengalami masalah atau kesalahan, pastikan Anda memiliki Node.js dan Git yang terinstal dengan benar di komputer Anda.
