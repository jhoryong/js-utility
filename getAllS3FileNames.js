
/**
 * Get all file names and their urls from S3 files list page
 * @param {string} baseUrl - ex) https://{bucketName}.s3.ap-northeast-2.amazonaws.com/
 */
function getAllS3FileNames() {
    // 1. Get array of file names
    const nodeList = document.querySelectorAll('.name.object.latest.object-name');
    const fileNameArr = Array.from(nodeList, e => e.textContent);
    
    // 2. Print filenames
    let fileText = '';
    fileNameArr.forEach((fileName) => { fileText += fileName + '\n' });
    console.log(fileText);

    // 3. Print full URLs of files    
    const url = window.location.href; // Get url
    const index = url.indexOf('.com/') + 5;
    const baseUrl = url.slice(0, index);
    const filePath = url.split('&')[1].split('=')[1]; // Extract file path from url
    
    // Concatenate url to filenames and print
    let urlText = '';
    fileNameArr.forEach((fileName) => { urlText += baseUrl + filePath + fileName + '\n' });
    console.log(urlText);
}
