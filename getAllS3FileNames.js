
/**
 * Get all file names and their urls from S3 files list page
 * @param {string} baseUrl - ex) https://{bucketName}.s3.ap-northeast-2.amazonaws.com/
 */
function getAllS3FileNames(baseUrl) {
    const nodeList = document.querySelectorAll('.name.object.latest.object-name');
    const fileNameArr = Array.from(nodeList, e => e.textContent); // File name array
    let fileText = '';
    fileNameArr.forEach((fileName) => { fileText += fileName + '\n' });
    console.log(fileText);

    // if baseUrl exists, print full url of files    
    if (baseUrl) {
        const url = window.location.href;
        const filePath = url.split('&')[1].split('=')[1]; // Extract file path from url
        let urlText = '';
        fileNameArr.forEach((fileName) => { urlText += baseUrl + filePath + fileName + '\n' });
        console.log(urlText);
    }
}
