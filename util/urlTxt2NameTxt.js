const fs = require('fs');

function urlTxt2NameTxt(filename){
    const data = fs.readFileSync(filename)
    const strarr = data.toString().replace(/\r\n/g,'\n').split('\n');
    const fileNames = strarr.map(url => {
        const arr = url.split('/');
        return arr[arr.length - 1];
    })
    const result = fs.createWriteStream('filenames.txt');
    fileNames.forEach(file => {
        result.write(file + '\n');
    })
}
urlTxt2NameTxt('request.txt')