function stringManipulation(word) {
	let vocal = 'aiueoAIUEO';
	let a = false;
	for (let i = 0; i < vocal.length; i++) {
	  if (word[0] === vocal[i]) {
		a = true;
	  }
	} if (a) {
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
	return result;
} 
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'tulis kalimatmu disini > '
});

rl.prompt();

rl.on('line', (input) => {
      console.log('hasil konversi: ' + sentencesManipulation(`${input}`));
rl.prompt();
}).on('close', () => {
  console.log('Good bye!');
  process.exit(0);
});