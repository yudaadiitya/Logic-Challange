function deretKaskus(n) {
    var a = [];
    for (let i = 3; i <= (n * 3); i+=3) {
        if (i % 5 === 0 && i % 6 === 0) {
            a.push('KASKUS');
        } else if (i % 5 === 0) {
            a.push('KAS')
        } else if (i % 6 === 0) {
            a.push('KUS')
        } else {
            a.push(i)
        }
    }
    return a;
}

console.log(deretKaskus(10));