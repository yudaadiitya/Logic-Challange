function indexPrime(param1) {
    let hasil = [];
    let number = 2;

    while (hasil.length < param1) {
        let isPrime = true;

        for (let i = 2; i <= Math.sqrt(number); i++) {
            if (number % i === 0) {
                isPrime = false;
                break;
            }
        }

        if (isPrime) {
            hasil.push(number);
        }

        number++;
    }

    return hasil[hasil.length - 1];
}

console.log(indexPrime(4));
console.log(indexPrime(500));
console.log(indexPrime(37786));