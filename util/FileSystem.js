import fs from 'fs'
import TextConverter from './TextConverter.js'

/** 
 * Make directory if the directory does not exist.
 */
 export function mkdir(dirName) {
    if (!fs.existsSync(dirName)){
        fs.mkdirSync(dirName);
    }
}

/**
 * Download a file from url using https GET request.
 * https://stackoverflow.com/questions/11944932/how-to-download-a-file-with-node-js-without-using-third-party-libraries 
 */
export function downloadFileFromUrl(url, dest, cb) {
    const file = fs.createWriteStream(dest);

    const request = https.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
            file.close(cb);  // close() is async, call cb after close completes.
        });
    });
}

export function downloadFileFromUrlArr(urlArr, dest, cb){
    return urlArr.forEach(url => {
        const fileName = TextConverter.extractFileNameFromUrl(url)
        downloadFileFromUrl(url, `${dir}/${fileName}`)
    })
}

async function downloadUrlsFromTxtFile(src, directory) {
    // 텍스트파일을 배열로 변환
    const result = TextConverter.convertTxtToArray(src);
    
    // 폴더생성
    mkdir(directory);

    // url 다운로드
    result.forEach(url => {
        const fileName = getFilenameFromUrl(url)
        downloadFileFromUrl(url, `${dir}/${fileName}`)
    })
}