function stringManipulation(word) {
	let vocal = 'aiueoAIUEO';
	let isVocal = false;
	for (let i = 0; i < vocal.length; i++) {
		if (word[0] === vocal[i]) {
			isVocal = true;
		}
	} if (isVocal) {
		return word;
	} else {
		return (`${word.substring(1)}${word[0]}nyo`);
	}
}
function sentencesManipulation(sentence) {
	let b = sentence.split(' ');
	for (let i = 0; i < b.length; + i++) {
		b[i] = stringManipulation(b[i])
	}
	let result = b.join(' ');
	console.log(result);
} sentencesManipulation('ibu pergi ke pasar bersama aku');