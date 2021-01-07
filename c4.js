function checkPrime(number){
    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) {
            return false;
        }
    }
    return number > 1;
}


function indexPrime(param1) {
    let counter = 0;
    let number = 2;

    while (counter < param1) {
        if (checkPrime(number)) {
            counter++;
        }
        number++;
    }

    return number - 1;
}

console.log(indexPrime(4));
console.log(indexPrime(500));
console.log(indexPrime(37786));