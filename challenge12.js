const fs = require('fs');
const readline = require('readline');
if (process.argv[2] === 'data.json') {
    fs.readFile('data.json' , 'utf8', (err, data) => {
        if (err) throw err;
        const obj = JSON.parse(data);
        let i = 0;
        let jumlahSalah = 0;
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: 'Jawaban: '
        });

        console.log("Selamat datang di permainan Tebak-tebakan. Kamu akan diberikan pertanyaan dari file ini 'data.json'. \nUntuk bermain, jawablah dengan jawaban yang sesuai. \nGunakan 'skip' untuk menangguhkan pertanyaannya, dan di akhir pertanyaan akan ditanyakan lagi.\n");
        console.log("Pertanyaan : " + (obj[i]['pertanyaan']))
        rl.prompt();

        rl.on('line', (jawaban) => {
            if (jawaban.toLowerCase() === 'skip') {
                obj.push(obj[i]);
                i++;
                jumlahSalah = 0;
                console.log("Pertanyaan : " + (obj[i]['pertanyaan']));
            }
            else {
                if (jawaban.toLowerCase() === obj[i]['tebakan']) {
                    console.log('\nAnda Beruntung!\n');
                    i++;    
                    jumlahSalah = 0;
                    if (i === obj.length) {
                        console.log('Anda Berhasil!');
                        process.exit(0);
                    }
                    console.log("Pertanyaan : " + (obj[i]['pertanyaan']));
                    rl.prompt();
                } else {
                    jumlahSalah++;
                    console.log("\nAnda Kurang Beruntung! Anda telah salah " + jumlahSalah + " kali, silahkan coba lagi");

                }
            }
            rl.prompt();
        }).on('close', () => {
            console.log('\nAnda Berhasil!');
            process.exit(0);

        });
    });
} else {
    console.log("Tolong sertakan nama file sebagai inputan soalnya \nMisalnya 'node challenge12.js data.json'");
}