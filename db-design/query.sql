-- Absensi Karyawan
SELECT K.Nama, A.Tanggal, A.Status
FROM Absensi A
JOIN Karyawan K ON A.ID_Karyawan = K.ID_Karyawan
ORDER BY A.Tanggal, K.Nama;

-- list tugas setiap karyawan
SELECT K.Nama, P.Nama_Proyek, T.Deskripsi, T.Status
FROM Tugas T
JOIN Karyawan K ON T.ID_Karyawan = K.ID_Karyawan
JOIN Proyek P ON T.ID_Proyek = P.ID_Proyek
ORDER BY K.Nama, P.Nama_Proyek;

-- manajemen project pada manager
SELECT M.Nama AS Manajer, P.Nama_Proyek, P.Biaya, P.Keuntungan, P.Status
FROM Proyek P
JOIN Karyawan M ON P.ID_Manajer = M.ID_Karyawan
ORDER BY M.Nama, P.Nama_Proyek;

-- list orang2 yang mengikuti sebuah project yang dia kerjakan
SELECT P.Nama_Proyek, K.Nama AS Anggota
FROM Anggota_Proyek AP
JOIN Karyawan K ON AP.ID_Karyawan = K.ID_Karyawan
JOIN Proyek P ON AP.ID_Proyek = P.ID_Proyek
ORDER BY P.Nama_Proyek, K.Nama;

-- menghitung pengeluaran project untuk membayar karyawan (hanya manajer)
SELECT P.Nama_Proyek, SUM(PP.Jumlah_Bayar) AS Total_Pengeluaran_Manajer
FROM Pembayaran_Proyek PP
JOIN Karyawan K ON PP.ID_Karyawan = K.ID_Karyawan
JOIN Proyek P ON PP.ID_Proyek = P.ID_Proyek
WHERE K.Posisi = 'Manajer'
GROUP BY P.Nama_Proyek
ORDER BY P.Nama_Proyek;

-- menghitung keuntungan dari hasil menyelesaikan project (hanya manajer)
SELECT P.Nama_Proyek, P.Keuntungan
FROM Proyek P
WHERE P.Status = 'Selesai'
ORDER BY P.Nama_Proyek;
