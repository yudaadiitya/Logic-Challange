function stringManipulation(word) {
	let vocal = 'aiueoAIUEO';
	let a = false;
	let hasil = '';
	for (let i = 0; i < vocal.length; i++) {
	  if (word[0] === vocal[i]) {
		a = true;
	  }
	} if (a) {
	  hasil = word;
	} else {
	  hasil = (`${word.substring(1)}${word[0]}nyo`);
	}
	console.log(hasil);
  }
  
  stringManipulation('ayam');
  stringManipulation('bebek');