function weirdMultiply(sentence) {
    let number = sentence.toString();
    if (1 < number.length) {
        let a = 1;
        let i = 0;
        while (i < number.length) {
        a *= number[i];
        i++;
        } return number = weirdMultiply(a);
    } else {
    return Number (number);
    }
}
console.log(weirdMultiply(39));
console.log(weirdMultiply(999));
console.log(weirdMultiply(3));