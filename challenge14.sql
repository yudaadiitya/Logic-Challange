-- SQLite
CREATE TABLE jurusan(id_jurusan INT PRIMARY KEY NOT NULL, nama_jurusan varchar(25) NOT NULL);
INSERT INTO jurusan (id_jurusan, nama_jurusan)
 VALUES
    (110, "Teknik Informatika"),
    (120, "Sistem Informasi"),
    (130, "Ilmu Komputer"),
    (140, "Teknik Komputer");
CREATE TABLE mahasiswa(nim INT PRIMARY KEY NOT NULL, nama_mhs varchar(30) NOT NULL, alamat TEXT, id_jurusan INT NOT NULL, FOREIGN KEY(id_jurusan) REFERENCES jurusan(id_jurusan));
INSERT INTO mahasiswa (nim, nama_mhs, alamat, id_jurusan)
 VALUES 
    (110201, "Muhammad Yuda", "Bandung", 110),
    (110202, "Rizki Agung", "Bandung Timur", 120),
    (110203, "Ade Sugiono", "Bogor", 110),
    (110204, "Albajili Gading", "Bogor", 120);
    
CREATE TABLE dosen(nip INT PRIMARY KEY NOT NULL, nama_dosen varchar(30) NOT NULL);
INSERT INTO dosen (nip, nama_dosen)
 VALUES
    (115201, "Pras Setyo"),
    (115202, "Rudi Widodo"),
    (115203, "Deden Masruri"),
    (115204, "Adri Maldi");
CREATE TABLE matakuliah(id_matkul INT PRIMARY KEY NOT NULL, nama_matkul varchar(30) NOT NULL, sks INT NOT NULL);
INSERT INTO matakuliah (id_matkul, nama_matkul, sks) 
 VALUES
    (1, "Algoritma & Struktur Data", 4),
    (2, "Dasar Dasar Pemrograman", 3),
    (3, "Teori Komputasi", 2),
    (4, "Data Mining", 4),
    (5, "Database dan Sistem Informasi", 3),
    (6, "Basis Data", 2);
CREATE TABLE kontrak(id_kontrak INT PRIMARY KEY NOT NULL, nim INT NOT NULL, nip INT NOT NULL, id_matkul INT NOT NULL, nilai varchar(2) NOT NULL, 
FOREIGN KEY(nim) REFERENCES mahasiswa(nim), FOREIGN KEY (nip) REFERENCES dosen(nip), FOREIGN KEY (id_matkul) REFERENCES matakuliah(id_matkul));
INSERT INTO kontrak (nim, nip, id_matkul, nilai)
 VALUES
    (110201, 115201, 1, 'A'),
    (110201, 115201, 1, 'A'),
    (110205, 115201, 1, 'A'),
    (110207, 115201, 1, 'A'),
    (110209, 115201, 1, 'A'),
    (110210, 115201, 1, 'A'),
    (110207, 115201, 1, 'A'),
    (110201, 115201, 1, 'A'),
    (110205, 115201, 1, 'A'),
    (110209, 115201, 1, 'A'),
    (110209, 115201, 1, 'A'),
    (110207, 115201, 1, 'A');

