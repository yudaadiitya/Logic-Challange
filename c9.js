function spiral(param1) {
    var matriks = [];
    var count = 0;
        for (let i = 0; i < param1; i++) {
             matriks[i] = []; 
             for (let j = 0; j < param1; j++) {
             matriks[i][j] = count;
             count++;      
            }
        }
    var angka = param1 * param1;
    var awalBaris = 0;
    var akhirBaris = param1 - 1;
    var awalKolom = 0;
    var akhirKolom = param1 - 1;
    var result = [];
    
    while (result.length < angka) {
        for (let x = awalBaris; x <= akhirBaris; x++) {
            result.push(matriks[awalKolom][x]);
         } awalKolom++;
        for (let y = awalKolom; y <= akhirKolom; y++) {
            result.push(matriks[y][akhirBaris]);
         } akhirBaris--;
        for (let x = akhirBaris; x >= awalBaris; x--) {
            result.push(matriks[akhirKolom][x]);
        } akhirKolom--;
        for (let y = akhirKolom; y >= awalKolom; y--) {
            result.push(matriks[awalBaris][y]);  
        } awalBaris++;
    }
    console.log(result);
}

spiral(5);
spiral(6);
spiral(7);    