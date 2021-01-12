function weirdMultiply(sentence) {
    let angka = sentence.toString();
    if (1 < angka.length) {
        let a = 1;
        let i = 0;
        while (i < angka.length) {
        a *= angka[i];
        i++;
        } return angka = weirdMultiply(a);
    } else {
    return Number (angka);
    }
}
console.log(weirdMultiply(39));
console.log(weirdMultiply(999));
console.log(weirdMultiply(3));