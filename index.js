const https = require('https');
const fs = require('fs');
const table = require('./data/table.js')

//https://www.codegrepper.com/code-examples/javascript/js+read+file+line+by+line+into+array
async function convertTextToArray(filename) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filename, function(err, data) {
            if(err) throw err;

            const arr = data.toString().replace(/\r\n/g,'\n').split('\n');
            console.log(result)
            resolve(arr);
        })
    })
}

// https://stackoverflow.com/questions/11944932/how-to-download-a-file-with-node-js-without-using-third-party-libraries
function download(url, dest, cb) {
    const file = fs.createWriteStream(dest);

    const request = https.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
            file.close(cb);  // close() is async, call cb after close completes.
        });
    });
}

function getFilenameFromUrl(url) {
    const arr = url.split('/');
    return arr[arr.length - 1];
}

function mkdir(dirName) {
    if (!fs.existsSync(dirName)){
        fs.mkdirSync(dirName);
    }
}

async function downloadUrls() {
    // txt 파일의 url 을 array 로 변환
    const result = await convertTextToArray('urls.txt')
    
    // 폴더생성
    const dir = `./json`
    mkdir(dir)

    // url 다운로드
    result.forEach(url => {
        const fileName = getFilenameFromUrl(url)
        download(url, `${dir}/${fileName}`)
    })
}

function extractOldUrlsFromJson() {
    // JSON 을 파싱하여 s3 url 추출, txt file로 저장
    const filesArr = fs.readdirSync('./json')
    // console.log(files)
    const txt = fs.createWriteStream('request.txt');
    filesArr.forEach(file => {
        const json = fs.readFileSync(`json/${file}`)
        const parsed = JSON.parse(json)
        const images = parsed.images[0] + '\n';
        txt.write(images);
    })

    // 추출한 txt file 에서 filename 추출하여 txt file 로 저장
    const data = fs.readFileSync('request.txt')
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

// 변경된 CDN URL 로 교체
// https://stackoverflow.com/questions/10685998/how-to-update-a-value-in-a-json-file-and-save-it-through-node-js
async function replaceUrl() {
    const filesArr = fs.readdirSync('./json')

    filesArr.forEach(async function(filename){
        const file = await require(`./json/${filename}`)
        if (!table[file.images]) {
            console.log(`fail on ${filename}`);
            return;
        }
        file.images = table[file.images];
        fs.writeFile(`./json/${filename}`, JSON.stringify(file), function(err) {
            if (err) return console.log(err, filename);
        })
    })
    
}
replaceUrl();