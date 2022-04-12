const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const carvideo=require('./data');
const cid=require('./tdata')
ffmpeg.setFfmpegPath(ffmpegInstaller.path);


function tconvert(name){
    ffmpeg(`./media/${name}`, { timeout: 232000 }).addOptions([
    '-profile:v baseline',
    '-level 3.0',
    '-start_number 0',
    '-hls_time 10',
    '-hls_list_size 0',
    '-f hls'
]).output('./chunks/output.m3u8').on('end', () => {
    console.log('end');
}).on('end', (stdout, stderr) => {
    console.log('Transcoding succeeded !');
    // process.exit(1)
      
        cid.forEach(element => {
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



exports.tconvert=tconvert;