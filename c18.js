const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Silahkan pilih opsi di bawah ini:"
});
const sqlite3 = require('sqlite3').verbose();
const Table = require('cli-table');
let db = new sqlite3.Database('./university.db', err => {
    if (err) throw err;
});
var batas = '===================================================================';
class Home {
    loginInterface() {
        console.log(batas);
        console.log('Welcome to Universitas Pendidikan Indonesia');
        console.log('Jl Setiabudhi No. 255')
        console.log(batas);
        const login = new Login();
        login.login();
    }
}
class Login extends Home {
    login() {
        let sqlUsername = `SELECT username FROM akunuser WHERE username = ?`;
        let sqlPass = `SELECT password FROM akunuser WHERE password = ?`;
        rl.question('username: ', answer => {
            let unameLogin = answer;
            db.all(sqlUsername, [unameLogin], (err, rows) => {
                if (err) throw err;
                console.log(batas);
                rl.question('password: ', answer => {
                    let pass = answer;
                    db.all(sqlPass, [pass], (err, rows) => {
                        if (err) throw err;
                        if (rows.length > 0 && pass === rows[0].password) {
                            console.log(`Welcome, ${unameLogin}. Your acces level is: ADMIN`)
                            const loginSucces = new Menu();
                            loginSucces.menuInterface();
                        } else {
                            console.log('Username atau password salah. Silahkan coba lagi.')
                            const loginFailed = new Home();
                            loginFailed.loginInterface();
                        }
                    });
                });
            });
        });
    }
}
class Menu {
    menuInterface() {
        console.log(batas);
        rl.prompt();
        console.log("\n[1] Mahasiswa");
        console.log("[2] Jurusan");
        console.log("[3] Dosen");
        console.log("[4] Mata kuliah");
        console.log("[5] Kontrak");
        console.log("[6] Keluar");
        console.log(batas);
        return this.optionMenu();
    }
    optionMenu() {
        rl.question("Masukkan salah satu no, dari opsi di atas: ", (answer) => {
            switch (answer) {
                case '1':
                    const mahasiswa = new Mahasiswa();
                    mahasiswa.mahasiswaMenu();
                    break;
                case '2':
                    const jurusan = new Jurusan();
                    jurusan.jurusanMenu();
                    break;
                case '3':
                    const dosen = new Dosen();
                    dosen.dosenMenu();
                    break;
                case '4':
                    const matkul = new Matkul();
                    matkul.matkulMenu();
                    break;
                case '5':
                    const kontrak = new Kontrak();
                    kontrak.kontrakMenu();
                    break;
                case '6':
                    process.exit(0);
                    break;
                default:
                    this.question();
                    break;
            }
        });
    }
}

// ===============Data Mahasiswa=================


class Mahasiswa {
    mahasiswaMenu() {
        console.log(batas);
        rl.prompt();
        console.log("\n[1] Daftar Mahasiswa");
        console.log("[2] Cari Mahasiswa");
        console.log("[3] Tambah Mahasiswa");
        console.log("[4] Hapus Mahasiswa");
        console.log("[5] Kembali");
        console.log(batas);
        return this.mahasiswaOption();
    }
    mahasiswaOption() {
        rl.question("Masukkan salah satu no, dari opsi di atas: ", (answer) => {
            switch (answer) {
                case '1':
                    this.showMahasiswa();
                    break;
                case '2':
                    this.searchMahasiswa();
                    break;
                case '3':
                    this.addMahasiswa();
                    break;
                case '4':
                    this.deleteMahasiswa();
                    break;
                case '5':
                    const kembali = new Menu();
                    kembali.menuInterface();
                    break;
                default:
                    this.mahasiswaMenu();
                    break;
            }
        });
    }
    showMahasiswa() {
        const sql = `SELECT * FROM mahasiswa`; db.all(sql, [], (err, rows) => {
            if (err) throw err;
            const table = new Table({
                head: ['NIM', 'Nama', 'Alamat', 'Jurusan', 'Usia'],
                colWidths: [10, 25, 15, 10, 10]
            }); rows.forEach(row => {
                table.push([row.nim, row.nama_mhs, row.alamat, row.id_jurusan, row.usia]);
            }); console.log(batas);
            console.log(table.toString());
            this.mahasiswaMenu();
        });
    } searchMahasiswa() {
        console.log(batas);
        rl.question('Masukkan NIM: ', (answer) => {
            let nim = answer;
            const sql = `SELECT nim, nama_mhs, alamat, id_jurusan, usia FROM mahasiswa WHERE mahasiswa.nim = ?`
            db.all(sql, [nim], (err, rows) => {
                if (err) throw err;
                if (rows.length > 0) {
                    console.log(batas);
                    console.log('Data Mahasiswa');
                    console.log(batas);
                    console.log(`NIM      : ${rows[0].nim}`);
                    console.log(`Nama     : ${rows[0].nama_mhs}`);
                    console.log(`Alamat   : ${rows[0].alamat}`);
                    console.log(`Jurusan  : ${rows[0].id_jurusan}`);
                    console.log(`Usia     : ${rows[0].usia}`);
                    this.mahasiswaMenu();
                } else {
                    console.log(`Mahasiswa dengan NIM: ${nim} tidak terdaftar.`);
                    this.searchMahasiswa();
                }

            })
        })
    } addMahasiswa() {
        console.log(batas);
        console.log('Lengkapi data di bawah ini:');
        rl.question("NIM: ", (nim) => {
            rl.question("Nama: ", (nama) => {
                rl.question("Alamat: ", (alamat) => {
                    rl.question("Jurusan: ", (jurusan) => {
                        rl.question("Umur: ", (umur) => {
                            const sql = `INSERT INTO mahasiswa (nim, nama_mhs, alamat, id_jurusan, usia) VALUES (?, ?, ?, ?, ?)`;
                            let newNim = nim;
                            let newNama = nama;
                            let newAlamat = alamat;
                            let newJurusan = jurusan;
                            let newUmur = umur;
                            db.all(sql, [newNim, newNama, newAlamat, newJurusan, newUmur], (err) => {
                                if (err) throw err;
                                console.log(batas);
                                console.log('Data mahasiswa baru berhasil ditambahkan.');
                                this.mahasiswaMenu();
                            })
                        })
                    })
                })
            })
        })
    } deleteMahasiswa() {
        console.log(batas);
        rl.question('Masukkan NIM mahasiswa yang akan dihapus: ', answer => {
            let nim = answer;
            const sql = `DELETE FROM mahasiswa WHERE nim = ?`; db.run(sql, [nim], err => {
                if (err) throw err;
                console.log(batas);
                console.log(`Mahasiswa dengan NIM: ${nim} telah dihapus.`);
                this.mahasiswaMenu();
            });
        });
    }
}

//===============Data Jurusan=================

class Jurusan {
    jurusanMenu() {
        console.log(batas);
        rl.prompt();
        console.log("\n[1] Daftar Jurusan");
        console.log("[2] Cari Jurusan");
        console.log("[3] Tambah Jurusan");
        console.log("[4] Hapus Jurusan");
        console.log("[5] Kembali");
        console.log(batas);
        return this.jurusanOption();
    }
    jurusanOption() {
        rl.question("Masukkan salah satu no, dari opsi di atas: ", (answer) => {
            switch (answer) {
                case '1':
                    this.showJurusan();
                    break;
                case '2':
                    this.searchJurusan();
                    break;
                case '3':
                    this.addJurusan();
                    break;
                case '4':
                    this.deleteJurusan();
                    break;
                case '5':
                    const kembali = new Menu();
                    kembali.menuInterface();
                    break;
                default:
                    this.jurusanMenu();
                    break;
            }
        });

    }
    showJurusan() {
        const sql = `SELECT * FROM jurusan`;
        db.all(sql, [], (err, rows) => {
            if (err) throw err;
            const table = new Table({
                head: ['ID Jurusan', 'Nama Jurusan'],
                colWidths: [15, 30]
            }); rows.forEach(row => {
                table.push([row.id_jurusan, row.nama_jurusan]);
            }); console.log(batas);
            console.log(table.toString());
            this.jurusanMenu();
        });
    }
    searchJurusan() {
        console.log(batas);
        rl.question('Masukkan ID Jurusan :', (answer) => {
            let idJurusan = answer
            const sql = `SELECT * FROM jurusan WHERE jurusan.id_jurusan = ?`;
            db.all(sql, [idJurusan], (err, rows) => {
                if (err) throw err;
                if (rows.length > 0) {
                    console.log(batas);
                    console.log('Data Jurusan');
                    console.log(batas);
                    console.log(`ID Jurusan     : ${rows[0].id_jurusan}`);
                    console.log(`Nama Jurusan   : ${rows[0].nama_jurusan}`);
                    console.log(batas);
                    this.jurusanMenu();
                } else {
                    console.log(`ID Jurusan ${idJurusan} tersebut tidak terdaftar.`)
                    this.searchJurusan();
                }
            })
        })
    }
    addJurusan() {
        console.log(batas);
        console.log('Lengkapi data di bawah ini: ');
        rl.question('ID Jurusan : ', (inputID) => {
            rl.question('Nama Jurusan: ', (nama) => {
                const sql = `INSERT INTO jurusan (id_jurusan, nama_jurusan) VALUES (?, ?)`;
                let idJurusan = inputID;
                let namaJurusan = nama;
                db.all(sql, [idJurusan, namaJurusan], (err, rows) => {
                    if (err) throw err;
                    console.log(batas);
                    console.log('Jurusan telah berhasil ditambahkan.');
                    this.jurusanMenu();
                })

            });
        });
    }
    deleteJurusan() {
        console.log(batas);
        rl.question('Masukan ID Jurusan yang akan dihapus :', (answer) => {
            const sql = `DELETE FROM jurusan WHERE id_jurusan = ?`;
            let idJurusan = answer;
            db.all(sql, [idJurusan], (err, rows) => {
                if (err) throw err;
                console.log(`Jurusan dengan ID: ${idJurusan} telah dihapus.`)
                this.jurusanMenu();
            })
        })
    }
}

//===============Data Dosen=================

class Dosen {
    dosenMenu() {
        console.log(batas);
        rl.prompt();
        console.log('\n[1] Daftar Dosen');
        console.log('[2] Cari Dosen');
        console.log('[3] Tambah Dosen');
        console.log('[4] Hapus Dosen');
        console.log('[5] Kembali');
        console.log(batas);
        return this.dosenOption();
    }
    dosenOption() {
        rl.question('Masukkan salah satu No. dari opsi diatas: ', (answer) => {
            switch (answer) {
                case '1':
                    this.showDosen();
                    break;
                case '2':
                    this.searchDosen();
                    break;
                case '3':
                    this.addDosen();
                    break;
                case '4':
                    this.deleteDosen();
                    break;
                case '5':
                    let kembali = new Menu;
                    kembali.menuInterface();
                    break;
                default:
                    this.dosenMenu();
                    break;
            }
        })

    }
    showDosen() {
        const sql = `SELECT * FROM dosen`;
        db.all(sql, [], (err, rows) => {
            if (err) throw err;
            const tabelDosen = new Table({
                head: ['NIP', 'Nama Dosen'],
                colWidths: [10, 30]
            })
            rows.forEach(row => {
                tabelDosen.push([row.nip, row.nama_dosen]);
            }); console.log(batas);
            console.log(tabelDosen.toString());
            this.dosenMenu();
        })
    }
    searchDosen() {
        console.log(batas);
        rl.question('Masukan NIP :', (nip) => {
            const sql = `SELECT * FROM dosen WHERE dosen.nip = ?`
            let nipDosen = nip;
            db.all(sql, [nipDosen], (err, rows) => {
                if (err) throw err;
                if (rows.length > 0);
                console.log(batas);
                console.log(`NIP        : ${rows[0].nip}`);
                console.log(`Nama Dosen : ${rows[0].nama_dosen}`);
                console.log(batas);
                this.dosenMenu();
            })
        })
    }
    addDosen() {
        console.log(batas);
        console.log('Lengkapi data di bawah ini :');
        rl.question('NIP : ', (nip) => {
            rl.question('Nama : ', (nama) => {
                const sql = `INSERT INTO dosen (nip, nama_dosen) VALUES (?, ?)`;
                let nipDosen = nip;
                let namaDosen = nama;
                db.all(sql, [nipDosen, namaDosen], (err, rows) => {
                    if (err) throw err;
                    console.log(batas);
                    console.log(`Dosen dengan ID: ${nipDosen} berhasil ditambahkan.`);
                    this.dosenMenu();
                })
            })

        })
    }
    deleteDosen() {
        console.log(batas);
        rl.question('Masukan NIP Dosen yang akan dihapus :', (nip) => {
            const sql = `DELETE FROM dosen WHERE nip = ?`
            let nipDosen = nip;
            db.all(sql, [nipDosen], (err, rows) => {
                if (err) throw err;
                console.log(`Dosen dengan NIP: ${nipDosen} telah dihapus.`);
                this.dosenMenu();
            })
        })
    }
}
class Matkul {
    matkulMenu() {
        console.log(batas);
        rl.prompt();
        console.log('\n[1] Daftar Mata Kuliah');
        console.log('[2] Cari Mata kuliah');
        console.log('[3] Tambah Mata kuliah');
        console.log('[4] Hapus Mata kuliah');
        console.log('[5] Kembali');
        console.log(batas);
        return this.matkulOption();
    }
    matkulOption() {
        rl.question('Masukan salah satu dari opsi diatas: ', (answer) => {
            switch (answer) {
                case '1':
                    this.showMatkul();
                    break;
                case '2':
                    this.searchMatkul();
                    break;
                case '3':
                    this.addMatkul();
                    break;
                case '4':
                    this.deleteMatkul();
                    break;
                case '5':
                    const kembali = new Menu();
                    kembali.menuInterface();
                    break;
                default:
                    this.matkulMenu();
                    break;
            }
        })

    }
    showMatkul() {
        console.log(batas);
        const sql = `SELECT * FROM matakuliah`
        db.all(sql, [], (err, rows) => {
            if (err) throw err;
            const tabelMatkul = new Table({
                head: ['ID Matkul', 'Nama Mata Kuliah', 'SKS'],
                colWidths: [15, 30, 5]
            });
            rows.forEach(row => {
                tabelMatkul.push([row.id_matkul, row.nama_matkul, row.sks]);
            }); console.log(batas);
            console.log(tabelMatkul.toString());
            this.matkulMenu();
        })
    }
    searchMatkul() {
        console.log(batas);
        rl.question('Masukan ID Matkul :', (idMatkul) => {
            const sql = `SELECT * FROM matakuliah WHERE matakuliah.id_matkul = ?`
            let id = idMatkul;
            db.all(sql, [id], (err, rows) => {
                if (err) throw err;
                if (rows.length > 0);
                console.log(batas);
                console.log(`ID Matkul        : ${rows[0].id_matkul}`);
                console.log(`Nama Matkul      : ${rows[0].nama_matkul}`);
                console.log(`Jumlah SKS       : ${rows[0].sks}`);
                console.log(batas);
                this.matkulMenu();
            })
        })
    }
    addMatkul() {
        console.log(batas);
        console.log('Lengkapi data di bawah ini :');
        rl.question('ID Matkul : ', (id) => {
            rl.question('Nama Matkul : ', (nama) => {
                rl.question('Jumlah SKS : ', (sks) => {
                    const sql = `INSERT INTO matakuliah (id_matkul, nama_matkul, sks) VALUES (?, ?, ?)`;
                    let idMatkul = id;
                    let namaMatkul = nama;
                    let sksMatkul = sks;
                    db.all(sql, [idMatkul, namaMatkul, sksMatkul], (err) => {
                        if (err) throw err;
                        console.log(batas);
                        console.log(`Mata kuliah dengan ID: ${idMatkul} berhasil ditambahkan.`);
                        this.matkulMenu();
                    })
                })
            })

        })
    }
    deleteMatkul() {
        console.log(batas);
        rl.question('Masukan ID Mata kuliah yang akan dihapus :', (id) => {
            const sql = `DELETE FROM matakuliah WHERE id_matkul = ?`
            let idMatkul = id;
            db.all(sql, [idMatkul], (err) => {
                if (err) throw err;
                console.log(`Mata kuliah dengan ID: ${idMatkul} telah dihapus.`);
                this.matkulMenu();
            })
        })
    }
}
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

const start = new Home();
start.loginInterface();