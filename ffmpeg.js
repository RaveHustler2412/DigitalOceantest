const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const carvideo=require('./data');
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

// const cid=[
//     {"Links":[{"Name":"","Hash":"QmfPnXLhFd4ChNxtCfPUC7f1Eu1y9sZtRgvGe9P4cUnNH5","Size":262158},{"Name":"","Hash":"QmQ2LCm1KJZ7rUi4q6T8NVVw5hMCDHBvWrjJM66x23zQhC","Size":262158},{"Name":"","Hash":"QmSBaE7v1QBqNt6rZEh8VtyXfvevWpzwsDNJWPBnSNhFiC","Size":262158},{"Name":"","Hash":"QmP2rDvtJJox3Rhrig4jVDbC113zfovHuHaeW8eyBgnezi","Size":196634}],"Data":"\u0008\u0002\u0018��\u003c ��\u0010 ��\u0010 ��\u0010 ��\u000c"}
//     ,{"Links":[{"Name":"","Hash":"QmPX3BKvqVf5DKDASaNChRGr7GMueSi74y8CfYdU7Cb3Cd","Size":262158},{"Name":"","Hash":"QmZZ3XNJoivZZcLsSdwjcUVHwdrBt5VSutfVLynYUy36L5","Size":103342}],"Data":"\u0008\u0002\u0018��\u0016 ��\u0010 ��\u0006"}
//   ,{"Links":[{"Name":"","Hash":"QmdzU8MpSfZZ7c4uThHMMWveujCkpPAv6aFAxqKZDizf6A","Size":262158},{"Name":"","Hash":"Qmc91EvxvuvmeKFvcF2Uqt9vY3CvtbPX3nJYGgs8Fi1KUV","Size":262158},{"Name":"","Hash":"QmatDn4ze2T2YD1Dq3nTPtvW3QY2N9fYQWeLTQmDKRE9rT","Size":126394}],"Data":"\u0008\u0002\u0018��' ��\u0010 ��\u0010 ��\u0007"}
//   ,{"Links":[{"Name":"","Hash":"QmdzU8MpSfZZ7c4uThHMMWveujCkpPAv6aFAxqKZDizf6A","Size":262158},{"Name":"","Hash":"Qmc91EvxvuvmeKFvcF2Uqt9vY3CvtbPX3nJYGgs8Fi1KUV","Size":262158},{"Name":"","Hash":"QmatDn4ze2T2YD1Dq3nTPtvW3QY2N9fYQWeLTQmDKRE9rT","Size":126394}],"Data":"\u0008\u0002\u0018��' ��\u0010 ��\u0010 ��\u0007"}
//   ,{"Links":[{"Name":"","Hash":"QmdzU8MpSfZZ7c4uThHMMWveujCkpPAv6aFAxqKZDizf6A","Size":262158},{"Name":"","Hash":"Qmc91EvxvuvmeKFvcF2Uqt9vY3CvtbPX3nJYGgs8Fi1KUV","Size":262158},{"Name":"","Hash":"QmatDn4ze2T2YD1Dq3nTPtvW3QY2N9fYQWeLTQmDKRE9rT","Size":126394}],"Data":"\u0008\u0002\u0018��' ��\u0010 ��\u0010 ��\u0007"}
//   ,{"Links":[{"Name":"","Hash":"QmRWdnjRMFdWTiinVkFKXHNGkUPJNK5NsHoVsWLPLaXrAE","Size":262158},{"Name":"","Hash":"QmcWfugNYXEUymdYLbQxLhuekzbfpgoPSyB7EWfH68TyPx","Size":262158},{"Name":"","Hash":"QmeyFwmi6VYRQoHhuCa8kF5ZXzjHMz7wh3m23QDSPhFjLx","Size":165122}],"Data":"\u0008\u0002\u0018��* ��\u0010 ��\u0010 ��\n"}
//   ,{"Links":[{"Name":"","Hash":"QmW3VCKMrbnPPkfZFtUVirfTftRAgoxocw5L1AdYH3XTmS","Size":262158},{"Name":"","Hash":"QmWy6RgiiafDtwk4Gq7JsLgLk4XFmHF7mHavqnk1tkSLx2","Size":18178}],"Data":"\u0008\u0002\u0018��\u0011 ��\u0010 ��\u0001"}
//   ,{"Links":[{"Name":"","Hash":"QmW3VCKMrbnPPkfZFtUVirfTftRAgoxocw5L1AdYH3XTmS","Size":262158},{"Name":"","Hash":"QmWy6RgiiafDtwk4Gq7JsLgLk4XFmHF7mHavqnk1tkSLx2","Size":18178}],"Data":"\u0008\u0002\u0018��\u0011 ��\u0010 ��\u0001"}
//   ,{"Links":[{"Name":"","Hash":"QmW3VCKMrbnPPkfZFtUVirfTftRAgoxocw5L1AdYH3XTmS","Size":262158},{"Name":"","Hash":"QmWy6RgiiafDtwk4Gq7JsLgLk4XFmHF7mHavqnk1tkSLx2","Size":18178}],"Data":"\u0008\u0002\u0018��\u0011 ��\u0010 ��\u0001"}
//   ]

function fconvert(){
    ffmpeg('./uploads/testvideo.mp4', { timeout: 232000 }).addOptions([
    '-profile:v baseline',
    '-level 3.0',
    '-start_number 0',
    '-hls_time 10',
    '-hls_list_size 0',
    '-f hls'
]).output('./uploads/output.m3u8').on('end', () => {
    console.log('end');
}).on('end', (stdout, stderr) => {
    console.log('Transcoding succeeded !');
    // process.exit(1)
      
        carvideo.forEach(element => {
            setTimeout(() => {
       
            console.log(element)
            }, 1000);
            // uploadToIpfs(element.name, element.hash)
          })
   
   
   
})
.on('start', (commandLine) => {
    console.log('start', commandLine);
})
.on('codecData', (data) => {
    console.log('Input is ' + data.audio + ' audio ' +
        'with ' + data.video + ' video');
})
.on('progress', function (progress) {
    console.log('Processing. Timemark: -> ' + progress.timemark)
})
.on('stderr', function (stderrLine) {
    // do nothing
})
.on('error', function (err, stdout, stderr) {
    console.log('Cannot process video: ' + err.message);
})
.on('data', function (chunk) {
    console.log('ffmpeg just wrote ' + chunk.length + ' bytes');
}).run()
}



exports.fconvert=fconvert;