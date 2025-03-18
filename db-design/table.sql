CREATE TABLE Karyawan (
  ID_Karyawan INT AUTO_INCREMENT PRIMARY KEY,
  Nama VARCHAR(100) NOT NULL,
  Posisi VARCHAR(50),
  Gaji DECIMAL(10, 2)
);




CREATE TABLE Absensi (
  ID_Absensi INT AUTO_INCREMENT PRIMARY KEY,
  ID_Karyawan INT NOT NULL,
  Tanggal DATE NOT NULL,
  Status ENUM('Hadir', 'Izin', 'Sakit', 'Alpa') NOT NULL,
  FOREIGN KEY (ID_Karyawan) REFERENCES Karyawan(ID_Karyawan)
);



CREATE TABLE Proyek ( 
  ID_Proyek INT AUTO_INCREMENT PRIMARY KEY,
  Nama_Proyek  VARCHAR(100) NOT NULL, 
  ID_Manajer INT NOT NULL,
  Biaya DECIMAL(15, 2),
  Keuntungan DECIMAL(15, 2),
  Status ENUM('Berjalan', 'Selesai') NOT NULL,
  FOREIGN KEY (ID_Manajer) REFERENCES Karyawan(ID_Karyawan)
  );




CREATE TABLE Tugas (
  ID_Tugas INT AUTO_INCREMENT PRIMARY KEY,
  ID_Proyek INT NOT NULL,
  ID_Karyawan INT NOT NULL,
  Deskripsi TEXT,
  Status ENUM('Belum Selesai', 'Sedang Dikerjakan', 'Selesai') NOT NULL,
  FOREIGN KEY (ID_Proyek) REFERENCES Proyek(ID_Proyek),
  FOREIGN KEY (ID_Karyawan) REFERENCES Karyawan(ID_Karyawan)
);



CREATE TABLE Anggota_Proyek (
  ID_Anggota INT AUTO_INCREMENT PRIMARY KEY,
  ID_Proyek INT NOT NULL,
  ID_Karyawan INT NOT NULL,
  FOREIGN KEY (ID_Proyek) REFERENCES Proyek(ID_Proyek),
  FOREIGN KEY (ID_Karyawan) REFERENCES Karyawan(ID_Karyawan)
);




CREATE TABLE Pembayaran_Proyek (
  ID_Pembayaran INT AUTO_INCREMENT PRIMARY KEY,
  ID_Proyek INT NOT NULL,
  ID_Karyawan INT NOT NULL,
  Jumlah_Bayar DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (ID_Proyek) REFERENCES Proyek(ID_Proyek),
  FOREIGN KEY (ID_Karyawan) REFERENCES Karyawan(ID_Karyawan)
);




INSERT INTO `Karyawan` (`Nama`, `Posisi`, `Gaji`) VALUES
('Kang Harkon', 'Manajer', '12000000.00'),
('Ucup Subandi', 'Anggota',  '6000000.00'),
('Anton Perkoso', 'Anggota',  '5500000.00'),
('Nguntup Cah Rowi', 'Manajer',  '15500000.00'),
('Usluk Almanak', 'Anggota',  '3900000.00'),
( 'Dimas Merhaba', 'Anggota', '5200000.00'),
('Asolo Alele', 'Anggota', '3500000.00');





INSERT INTO `Absensi` (`ID_Karyawan`, `Tanggal`, `Status`) VALUES
(1, '2025-03-19', 'Hadir'),
(2, '2025-03-19', 'Hadir'),
(3, '2025-03-19', 'Izin'),
(4, '2025-03-19', 'Hadir'),
(5, '2025-03-19', 'Sakit'),
(6, '2025-03-19', 'Alpa'),
(7, '2025-03-19', 'Hadir');














INSERT INTO `Proyek` ( `Nama_Proyek`, `ID_Manajer`, `Biaya`, `Keuntungan`, `Status`) VALUES
('Proyek Sayap Merah', 1, '70000000.00', '25000000.00', 'Selesai'),
('Proyek Tiga Benua', 4, '50000000.00', '18000000.00', 'Berjalan'),
('Proyek Andalusia', 1, '90000000.00', '32000000.00', 'Selesai');








INSERT INTO `Tugas` ( `ID_Proyek`, `ID_Karyawan`, `Deskripsi`, `Status`) VALUES
( 1, 1,'Membuat sayap merah', 'Selesai'),
(2, 2, 'Membangun Cabang Asia-Pasifik', 'Belum Selesai'),
(3, 3, 'Melakukan pengamatan Antropologi dan Sosiologi', 'Belum Selesai'),
(2, 4, 'Membangun jaringan diplomasi', 'Sedang Dikerjakan'),
(2, 5, 'Menenentukan target lokasi', 'Selesai'),
(3, 6, 'Menyuap para pejabat setempat', 'Sedang Dikerjakan');




INSERT INTO `Anggota_Proyek` ( `ID_Proyek`, `ID_Karyawan`) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 4),
(2, 5),
(3, 4),
(3, 6);








INSERT INTO `Pembayaran_Proyek` ( `ID_Proyek`, `ID_Karyawan`, `Jumlah_Bayar`) VALUES
(1, 1, '5000000.00'),
(1, 1, '3000000.00'),
(2, 4, '4000000.00'),
(3, 1, '6000000.00'),
(2, 4, '3500000.00'),
(3, 1, '7000000.00');
