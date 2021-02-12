class Kontrak {
    kontrakMenu() {
        console.log(batas);
        rl.prompt();
        console.log('\n[1] Daftar Kontrak');
        console.log('[2] Cari Kontrak');
        console.log('[3] Tambah Kontrak');
        console.log('[4] Hapus Kontrak');
        console.log('[5] Kembali');
        console.log(batas);
        return this.kontrakOption();
    }
    kontrakOption() {
        rl.question('Masukan salah satu dari opsi diatas: ', (answer) => {
            switch (answer) {
                case '1':
                    this.listKontrak();
                    break;
                case '2':
                    this.searchKontrak();
                    break;
                case '3':
                    this.addKontrak();
                    break;
                case '4':
                    this.deleteKontrak();
                    break;
                case '5':
                    const kembali = new Menu();
                    kembali.menuInterface();
                    break;
                default:
                    this.kontrakMenu();
                    break;
            }
        })

    }
    listKontrak() {
        console.log(batas);
        const sql = `SELECT * FROM kontrak`
        db.all(sql, [], (err, rows) => {
            if (err) throw err;
            const tabelKontrak = new Table({
                head: ['ID Kontrak', 'NIM Mahasiswa', 'NIP Dosen', 'ID Matkul', 'Nilai'],
                colWidths: [15, 20, 15, 15, 10]
            });
            rows.forEach(row => {
                tabelKontrak.push([row.id_kontrak, row.nim, row.nip, row.id_matkul, row.nilai]);
            }); console.log(batas);
            console.log(tabelKontrak.toString());
            this.kontrakMenu();
        })
    }
    searchKontrak() {
        console.log(batas);
        rl.question('Masukan ID Kontrak :', (idKontrak) => {
            const sql = `SELECT * FROM kontrak WHERE kontrak.id_kontrak = ?`
            let id = idKontrak;
            db.all(sql, [id], (err, rows) => {
                if (err) throw err;
                if (rows.length > 0);
                console.log(batas);
                console.log('Data Kontrak');
                console.log(batas);
                console.log(`ID Kontrak        : ${rows[0].id_kontrak}`);
                console.log(`NIM Mahasiswa     : ${rows[0].nim}`)
                console.log(`NIP Dosen         : ${rows[0].nip}`);
                console.log(`ID Matkul         : ${rows[0].id_matkul}`);
                console.log(`Nilai             : ${rows[0].nilai}`);
                console.log(batas);
                this.kontrakMenu();
            })
        })
    }
    addKontrak() {
        console.log(batas);
        console.log('Lengkapi data di bawah ini :');
        rl.question('ID Kontrak : ', (idKontrak) => {
            rl.question('NIM Mahasiswa : ', (nim) => {
                rl.question('NIP Dosen : ', (nip) => {
                    rl.question('ID Matkul : ', (idMatkul) => {
                        rl.question('Nilai : ', (n) => {
                            const sql = `INSERT INTO kontrak (id_kontrak, nim, nip, id_matkul, nilai) VALUES (?, ?, ?, ?, ?)`;
                            let noKontrak = idKontrak;
                            let nimMahasiswa = nim;
                            let nipDosen = nip;
                            let noMatkul = idMatkul;
                            let nilai = n;
                            db.all(sql, [noKontrak, nimMahasiswa, nipDosen, noMatkul, nilai], (err) => {
                                if (err) throw err;
                                console.log(batas);
                                console.log(`Kontrak dengan ID: ${noKontrak} berhasil ditambahkan.`);
                                this.kontrakMenu();
                            })
                        })
                    })

                })
            })
        })
    }
    deleteKontrak() {
        console.log('====================================================');
        rl.question('Masukkan ID Kontrak yang akan dihapus: ', (id) => {    
            let idKontrak = id;
            const sql = `DELETE FROM kontrak WHERE id_kontrak = ?`;
             db.all(sql, [idKontrak], (err) => {
                if (err) throw err;
                console.log(batas);
                console.log(`Kontrak dengan ID: ${idKontrak} telah dihapus.`);
                this.kontrakMenu();
            });
        });
    }
}
export {Kontrak};