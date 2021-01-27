function weirdMultiply(sentence) {
	let angka = sentence.toString();
	if (1 < angka.length) {
		let a = 1;
		for (let i = 0; i < angka.length; i++) {
			a *= angka[i];
		}
		return angka = weirdMultiply(a);
	} else {
		return Number (angka);
	}
}

console.log(weirdMultiply(39)); // -> 3 * 9 = 27 -> 2 * 7 =14 1 * 4 = 4
console.log(weirdMultiply(999)); // -> 9 * 9 * 9 = 729 -> 7 * 2 * 9 = 126 -> 1 * 2 * 6 = 12 -> 1 * 2 = 2
console.log(weirdMultiply(3)); // -> 3 karena satu digit