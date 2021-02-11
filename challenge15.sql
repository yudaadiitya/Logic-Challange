- SQLite
ALTER TABLE mahasiswa ADD COLUMN usia INT;
UPDATE mahasiswa SET usia = 22 WHERE nim = 110201;
UPDATE mahasiswa SET usia = 19 WHERE nim = 110202;
UPDATE mahasiswa SET usia = 17 WHERE nim = 110203;
UPDATE mahasiswa SET usia = 23 WHERE nim = 110204;
-- 1.  Tampilkan seluruh data mahasiswa beserta nama jurusannya
SELECT mahasiswa.*, jurusan.nama_jurusan
FROM mahasiswa
INNER JOIN jurusan
ON jurusan.id_jurusan = mahasiswa.id_jurusan;

-- 2. Tampilkan mahasiswa yang memiliki umur dibawah 20 tahun
SELECT nim, nama_mhs, usia
FROM mahasiswa
WHERE usia < 20;

-- 3. Tampilkan mahasiswa yang memiliki nilai 'B' ke atas
SELECT DISTINCT nim, nama_mhs
FROM mahasiswa
WHERE nim IN (
    SELECT m.nim from mahasiswa m INNER JOIN kontrak k
    ON m.nim = k.nim WHERE k.nilai IN ('A', 'B'));

-- 4. Tampilkan mahasiswa yang memiliki jumlah SKS lebih dari 10
SELECT m.nim, m.nama_mhs, SUM(mk.sks) total_sks
FROM mahasiswa m, matakuliah mk
INNER JOIN kontrak k
ON m.nim = k.nim AND mk.id_matkul = k.id_matkul
GROUP BY m.nim HAVING total_sks > 10;

--5. Tampilkan mahasiswa yang mengontrak mata kuliah 'data mining'
SELECT nama_mhs, nama_matkul
FROM mahasiswa, kontrak, matakuliah
WHERE kontrak.nim = mahasiswa.nim
AND kontrak.id_matkul = matakuliah.id_matkul
AND nama_matkul = 'Data Mining';

--6. Tampilkan jumlah setiap mahasiswa untuk setiap dosen
SELECT dosen.nip, dosen.nama_dosen, COUNT(mahasiswa.nama_mhs) jumlah_mahasiswa
FROM dosen, mahasiswa
INNER JOIN kontrak ON dosen.nip = kontrak.nip AND mahasiswa.nim = kontrak.nim
GROUP BY dosen.nip;

--7 Urutkan mahasiswa berdasarkan umurnya
SELECT nim, nama_mhs, usia FROM mahasiswa ORDER BY usia;

--8 Tampilkan kontrak matkul yg harus diulang (nilai D dan E), serta tampilkan data mahasiswa jurusan dan dosen secara lengkap
SELECT DISTINCT mahasiswa.nim, nama_mhs, alamat, usia, mahasiswa.id_jurusan, id_kontrak, matakuliah.id_matkul, nama_matkul, sks, nilai, nama_dosen,dosen.nip , nama_jurusan
FROM kontrak
JOIN mahasiswa ON kontrak.nim = mahasiswa.nim
JOIN matakuliah ON kontrak.id_matkul = matakuliah.id_matkul
JOIN dosen ON kontrak.nip = dosen.nip
JOIN jurusan ON mahasiswa.id_jurusan = jurusan.id_jurusan
WHERE nilai = 'D' OR nilai = 'E';