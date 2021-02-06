-- SQLite
CREATE TABLE jurusan(id_Jurusan INT PRIMARY KEY NOT NULL, nama_Jurusan varchar(25) NOT NULL);
CREATE TABLE mahasiswa(nim INT PRIMARY KEY NOT NULL, nama_Mhs varchar(30) NOT NULL, alamat TEXT, id_jurusan INT NOT NULL, FOREIGN KEY(id_jurusan) REFERENCES jurusan(id_jurusan));
CREATE TABLE dosen(nip INT PRIMARY KEY NOT NULL, nama_Dosen varchar(30) NOT NULL);
CREATE TABLE matakuliah(id_Matkul INT PRIMARY NOT NULL, nama_Matkul varchar(25) NOT NULL, sks INT NOT NULL);
CREATE TABLE kontrak(
id_Kontrak INT PRIMARY NOT NULL, nim INT NOT NULL, id_Matkul INT NOT NULL, nip INT NOT NULL, nilai char(2), FOREIGN KEY(nim) REFERENCES mahasiswa(nim), FOREIGN KEY(id_Matkul) REFERENCES matakuliah(id_Matkul), FOREIGN KEY(nip) REFERENCES dosen(nip)
);

INSERT INTO jurusan VALUES (110, "Teknik Informatika");
INSERT INTO jurusan VALUES (120, "Sistem Informasi");
INSERT INTO jurusan VALUES (130, "Ilmu Komputer");
INSERT INTO jurusan VALUES (140, "Statistika";

INSERT INTO mahasiswa VALUES (110201, "Yuda", "Bandung", 110);
INSERT INTO mahasiswa VALUES (110202, "Agung", "Bandung Timur", 120);
INSERT INTO mahasiswa VALUES (110203, "Ade", "Bogor", 110);
INSERT INTO mahasiswa VALUES (110204, "Gading", "Bogor", 120);
INSERT INTO mahasiswa VALUES (110205, "Asep", "Garut", 130);
INSERT INTO mahasiswa VALUES (110206, "Udin", "Cianjur", 140);
INSERT INTO mahasiswa VALUES (110207, "Jajang", "Tasik", 140);
INSERT INTO mahasiswa VALUES (110208, "Andi", "Bandung", 120);
INSERT INTO mahasiswa VALUES (110209, "Kamal", "Bekasi", 110);
INSERT INTO mahasiswa VALUES (110210, "Doni", "Cikampek", 130);

