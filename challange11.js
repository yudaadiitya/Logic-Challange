var readline = require('readline');
var fs = require('fs');
var data = fs.readFileSync ("data.json", "utf-8");
var obj = JSON.parse(data);
var i = 0;
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Tebakan:'
    
});

console.log('Selamat datang di permainan Tebak Kata, silahkan isi dengan jawaban yang benar ya!\n')
console.log("Pertanyaan :" + (obj[i].pertanyaan))
rl.prompt();

rl.on('line', (jawaban) => {
    if(jawaban.toLowerCase() === obj[i].tebakan) {
        console.log('Selamat Anda Benar!\n');
        i++;
        if(i == obj.length) {
            console.log('\nHore Anda menang');
            process.exit();    
        }
        console.log("Pertanyaan :" + (obj[i].pertanyaan));
        rl.prompt();
    }
    else {
        console.log("Wkwkwkwk, Anda kurang beruntung!\n")  
    }
    rl.prompt();
}).on('close', () => {
  console.log('Good bye!');
  process.exit(0);    
});
