const fs = require('fs');
const data = JSON.parse(fs.readFileSync('todo.json', 'utf8'));
const input = process.argv;
let number = parseInt(process.argv[3] - 1);
const write = (tulis) => fs.writeFileSync('todo.json', JSON.stringify(tulis, null, 3));
if (!input[2] || input[2] === 'help') {

    console.log(
        '>>> JS TODO <<<\n' +
        '$ node todo.js <command>\n' +
        '$ node todo.js list\n' +
        '$ node todo.js task <task_id>\n' +
        '$ node todo.js add <task_content>\n' +
        '$ node todo.js delete <task_id>\n' +
        '$ node todo.js complete <task_id>\n' +
        '$ node todo.js uncomplete <task_id>\n' +
        '$ node todo.js list:outstanding asc|desc\n' +
        '$ node todo.js list:completed asc|desc\n' +
        '$ node todo.js tag <task_id> <tag_name_1> <tag_name2>...<tag_name_N>\n' +
        '$ node todo.js filter:<tag_name>'
    );
    process.exit(0);
}
switch (input[2]) {
    case 'add':
        const output = input.slice(3).join(' ');
        data.push({
            'activites': output,
            'complete': false,
            'tags': []
        });
        write(data);
        console.log(`"${output}", telah ditambahkan.`);
        break;
    case 'list':
        console.log('Daftar Pekerjaan');
        for (i = 0; i < data.length; i++) {
            console.log(`${i + 1}.${data[i].complete ? '[x]' : '[ ]'}${data[i].activites}`)
        }
        write(data);
        break;
    case 'delete':
        let item = data[number];
        data.splice(number, 1);
        console.log(`'${item.activites}' telah dihapus dari daftar.`);
        write(data);
        break;
    case 'complete':
        let selesai = data[number];
        selesai.complete = true;
        console.log(`'${selesai.activites}' telah selesai.`);
        write(data);
        break;
    case 'uncomplete':
        let belumSelesai = data[number];
        belumSelesai.complete = false;
        console.log(`'${belumSelesai.activites}' status selesai dibatalkan.`);
        write(data);
        break;
    case 'list:outstanding':
        console.log('Daftar Pekerjaan');
        if (input[3] === 'asc') {
            for (let j = 0; j < data.length; j++) {
                if (!data[j].complete) {
                    console.log(`${j + 1}.${data[j].complete ? '[x]' : '[ ]'}${data[j].activites}`);
                }
            }
        }
        else if (input[3] === 'desc') {
            for (let k = data.length - 1; k >= 0; k--) {
                if (!data[k].complete) {
                    console.log(`${k + 1}.${data[k].complete ? '[x]' : '[ ]'}${data[k].activites}`);
                }
            }
        }
        break;
    case 'list:completed':
        console.log('Daftar Pekerjaan');
        if (input[3] === 'asc') {
            for (let j = 0; j < data.length; j++) {
                if (data[j].complete) {
                    console.log(`${j + 1}.${data[j].complete ? '[x]' : '[ ]'}${data[j].activites}`);
                }
            }
        }
        else if (input[3] === 'desc') {
            for (let k = data.length - 1; k >= 0; k--) {
                if (data[k].complete) {
                    console.log(`${k + 1}.${data[k].complete ? '[x]' : '[ ]'}${data[k].activites}`);
                }
            }
        }
        break;
    case 'tag':
        for (let i = 4; i < process.argv.length; i++) {
            data[number].tags.push(input[i]);
        }
        write(data);
        console.log(`Tag '${data[number].tags}' telah ditambahkan ke daftar '${data[number].activites}'.`);
        break;
    default: // filter
        let filterItem = process.argv[2].split(':');
        for (let i = 0; i < data.length; i++) {
            if (data[i].tags.includes(filterItem[1])) {
                console.log('Daftar Pekerjaan')
                console.log(`${i + 1}. [${data[i].complete ? 'X' : ' '}] ${data[i].activites}`);
            }
        }
        break;
}