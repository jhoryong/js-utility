import fs from 'fs'


/** 
 * Extract a file name from an url string.
*/
export function extractFileNameFromUrl(url) {
    const arr = url.split('/');
    return arr[arr.length - 1];
}

/**
 * Extract file names from an url array.
 */
 export function extractFileNameFromUrlArr(urlArr) {
    return urlArr.map(url => extractFileNameFromUrl(url))
}


/**
 * Get URLs in a text file and create a new file with extracted file names.
 */
 export function convertURLTxtToFileNameTxt(srcTxt, destTxt){
    const data = fs.readFileSync(srcTxt)
    const arrURL = data.toString().replace(/\r\n/g,'\n').split('\n');
    const arrFileNames = extractFileNameFromUrlArr(arrURL);

    const txtFile = fs.createWriteStream(`txt/${destTxt}`);
    arrFileNames.forEach(file => {
        txtFile.write(file + '\n');
    })
}


/**
 * Convert strings in a text file to a JavaScript array.
 * https://www.codegrepper.com/code-examples/javascript/js+read+file+line+by+line+into+array
 */
 export function convertTxtToArray(srcTxt) {
    const data = fs.readFileSync(srcTxt)
    const arr = data.toString().replace(/\r\n/g,'\n').split('\n');
    return arr;
}


/**
 * Convert array into a text file.
 */
 export function convertArrayToTxt(array, destTxt) {
    const txtFile = fs.createWriteStream(`txt/${destTxt}`);
    array.forEach(e => {
        txtFile.write(e + '\n');
    })
}

