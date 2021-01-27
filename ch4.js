function checkPrime(number){
    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) {
            return false;
        }
    }
    return true;
}


function indexPrime(param1) {
    let result = [];
    let number = 2;

    while (result.length < param1) {
        if (checkPrime(number)) {
            result.push(number);
        }
        number++;
    }

    return result[result.length - 1];
}

console.log(indexPrime(4));
console.log(indexPrime(500));
console.log(indexPrime(37786));