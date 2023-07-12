# Dokumentasi Perbaikan testdebug

Berikut adalah perbaikan yang telah dilakukan pada file testdebug.

1. Masalah: Banyaknya nilai `valueAsString` pada `rawData` yang tidak memiliki ',' di ujungnya, menyebabkan kesalahan saat menjalankan html.
   Perbaikan: Menambahkan ',' pada akhir nilai `valueAsString` yang tidak memiliki ',' di ujungnya.

2. Masalah: Terdapat satu line di mana atribut `valueAsString` kosong, yaitu pada case `atribut case.life[0].product[0].benefit[12].amount`.
   Perbaikan: Mengisi atribut `valueAsString` dengan nilai yang sesuai.

3. Masalah: Beberapa objek tidak memiliki ',' di ujungnya, menyebabkan kesalahan.
   Perbaikan: Menambahkan ',' pada akhir objek yang tidak memiliki ',' di ujungnya.

4. Masalah: Menghapus fungsi `compare` pertama yang tidak berguna.

5. Masalah: Menghapus fungsi `compareDeep` yang tidak berguna.

6. Masalah: Mengubah nama fungsi `compareDeep2` menjadi `compareDeep` agar lebih mudah dimengerti.

7. Masalah: Menghapus penggunaan `cleanA` dan `cleanB` pada `compareDeep2` karena tidak berguna setelah di-match.

8. Masalah: Mengganti nama variabel `a` dan `b` menjadi `strA` dan `strB` karena digunakan sebagai parameter sebelumnya.

```js
   //Sebelumnya
        var a = parseInt(cleanA[].slice(1, cleanA[i].length));
        var b = parseInt(cleanB[i].slice(1, cleanB[i].length));

        if (a < b)
            return -1;
        if (a > b)
            return 1;

   //Setelah
        var strA = tmpStra[i];
        var strB = tmpStrb[i];

        if (strA < strB) return -1;
        if (strA > strB) return 1;
```

10. Masalah: Mengubah nilai `strA` dan `strB` hanya menjadi `tmpStra[i]` dan `tmpStrb[i]` karena ingin mengurutkannya secara alphabetically dan tidak perlu menggunakan `slice` atau `parseInt`.

11. Masalah: Menghapus baris kode berikut karena tidak dibutuhkan:

```js
//replace(/\[+(\d+)+\]/g,'');
var tmpIgA = tmpStra.replace(/\[+(\d+)+\]/g, '');
var tmpIgB = tmpStrb.replace(/\[+(\d+)+\]/g, '');
return compare(tmpStra);
```

12. Masalah: Mengubah `console.log(tt)` menjadi kode berikut untuk mencetak seluruh case terurut berdasarkan abjad:

```js
var txt = '';
for (var i = 0; i < tt.length; i++) {
	txt += tt[i].attribute + '<br>';
}
document.getElementById('demo').innerHTML = txt;
```

Hal ini dilakukan karena terdapat tag `<p>` kosong dengan id "demo" yang seharusnya mencetak seluruh case yang diurutkan berdasarkan abjad.

```

```
