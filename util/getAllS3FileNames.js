import fs from 'fs';

/**
 * Get all file names and their urls from S3 files list page
 * @param {string} baseUrl - ex) https://{bucket name}.s3.ap-northeast-2.amazonaws.com/
 * @param {string} extension - Add extension you want to specify. ex) 'mp3'
 */
function getAllS3FileNames(baseUrl, extension, isWriteTextFile) {
    // Get array of file names
    const nodeList = document.querySelectorAll('.name.object.latest.object-name');
    let fileNameArr = Array.from(nodeList, e => e.textContent);
    
    // Filter extension
    if (extension) {
        fileNameArr = fileNameArr.filter(fileName => fileName.endsWith(extension))
    }
    
    // Print filenames
    let fileText = '';
    fileNameArr.forEach((fileName) => { fileText += fileName + '\n' });
    console.log(fileText);

    // Extract and base url and file path 
    if (baseUrl) {
        const url = window.location.href; // Get url
        const filePath = url.split('&')[1].split('=')[1]; 
        
        // Concatenate url to filenames and print
        let urlText = '';
        fileNameArr.forEach((fileName) => { urlText += baseUrl + filePath + fileName + '\n' });
        console.log(urlText);
    }
    
    // if (isWriteTextFile) saveTextFile(urlText);
}

function saveTextFile(string) {
    const file = fs.createWriteStream('urls.txt');
    file.write(string);
}