function pola(str) {
var angka = str.split(" ");
var hasil = [];
    for (let i = 0; i <= 9; i++) {
        for (let j = 0; j <= 9; j++) {
            if (Number(angka[0].replace(/#/, i)) * Number(angka[2]) === Number(angka[4].replace(/#/, j))) {
                hasil.push(i, j);
            }
        }
    }
    return hasil;
}
console.log(pola("42#3 * 188 = 80#204"));
console.log(pola("8#61 * 895 = 78410#5"));