const express = require("express");
const app = express();
const fs = require("fs");
const { fconvert } = require('./ffmpeg');
const {tconvert} = require('./tconvert');
const multer = require('multer')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
const path = require('path')
const { create }=require('ipfs-http-client') 


async function ipfs(Buffer){
// connect to the default API address http://localhost:5001
const client = create()
const { cid } = await client.add(Buffer)
console.log(cid.toString())
}


const hashid=["QmfPnXLhFd4ChNxtCfPUC7f1Eu1y9sZtRgvGe9P4cUnNH5","QmPEq1jAv9BFSSDTgXN4zedXcuyFr6YWHcN4fCTUR6hKjA","QmXuQThFsUbu2BBERHDRTuYHX7Mya77eQuD9hrTSgkAEb3","QmUfFYbC8mwujZ2Yqz6FCQC56K3TLxeQfXC5CPtb2zcbEV","QmUyj53V2sE4rKLnMwCt5SpcmF61Jfk4CWRJXgV8jVpkmA","QmWwHyhqDzbcDAwsSkXvPRLRfSBJfjWrCU9nb6rc8eB9A5","QmTcQ1xM4hGh513zb4ZSK4UNgRsHooeePNHRm11wD7FaZR","QmaTPxYG3oLxPzwZRepg86Q3hzrSWxjv3SD9mAYkh3zkLa","QmPYnsxR73dkwx8KFFUHjG8DsbpvTFRsL7kTXwx3DvGw6S","QmcZfz7UP6Ncvtwioe71D5jCZjzHztyXwFPhmazbXJHHkE","QmbvPo6rtBg2Aa6JFxVhwM2fvsh5FHq3YoQoJ8vMHHNty4","QmXZWaekCaMhHpJuEHX85QFHZEW1yLt1AMVW7UWkvR9fma","QmP8wXQckjeFJ5Uawt4im6eZ8vB3k3512iHs3LRA8kbPvx"]

const cors = require('cors');
const { randomFill, randomBytes } = require("crypto");

app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));


var videoNumber=0;
var ip_address=["157.245.97.134","204.48.21.95","134.209.176.62","68.183.65.159","142.93.147.119"];
var nodes_online=["157.245.97.134","204.48.21.95"];


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'media/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(/ /g, '_'));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 100    // 50 MB
  }
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/test", function (req, res) {
  const { ip } = req.body;
  console.log(ip);
  res.send("ok");
})


app.post('/upload', upload.single('file'), (req, res, next) => {
  console.log(req.file);

  // const videoPath = `../uploads/${file}`
  const videoPath = '.media/'
  const resolvedPath = path.resolve("media", videoPath);
  // res.sendFile(resolvedPath);
  // console.log(resolvedPath)
 
  console.log(req.file.filename)

  if(req.file){
      res.json({
          message: "File uploaded successfully",
          file: req.file
      });
  }
  if(req.file.filename === 'demo7.mp4'){
  setTimeout(() => {
    tconvert(req.file.filename);
  }, 2000);

  setTimeout(() => {
    const dir = './chunks'
const files = fs.readdirSync(dir)



console.log(files)
for (const file of files) {
  // console.log(file)
  // ipfs(file)
  let testFile = fs.readFileSync(`./chunks/${file}`);
let testBuffer = new Buffer(testFile);
ipfs(testBuffer)

  }
}, 30000);


  


  } 
  // else{
  //   setTimeout(() => {
  //     fconvert()
  //   }, 2000);
  
  // }
    //  uploadToIpfs('../uploads/', "trail")


});

app.get("/video", function (req, res) {
  // Ensure there is a range given for the video
  videoNumber++;
  var ip_setup= nodes_online[(Math.random() * nodes_online.length) | 0]
  var videohashValue= hashid[(Math.random() * hashid.length) | 0]
    // var videohash= "QmdzU"+randomBytes(24).toString("hex");
  const range = req.headers.range;
  console.log(range)
  if (!range) {
    res.status(400).send("Requires Range header");
  }


  const videoPath = "testvideo.mp4";
  const videoSize = fs.statSync("testvideo.mp4").size;
 // const resolvedPath = path.resolve("uploads", videoPath);

   // res.sendFile(resolvedPath);


  // Parse Range
  // Example: "bytes=32324-"
  var CHUNK_SIZE = 128000+Math.floor(Math.random()*10+128000)*(6-6)//262144 // 800kB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "chunk",
    "File-Hash": videohashValue,
    "File-CNo": videoNumber,
    "IP-Address": ip_setup
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });


  // Stream the video chunk to the client

  // var delay=580+(Math.random()+100)*(6-6)//nodes_online.length))
  //  console.log(delay)
  //  setTimeout(() => {
  // //  videoStream.pipe(res);
   
  // },delay);
   videoStream.pipe(res);

});

app.get('/mobvideo', function (req, res) {
    const videoPath = "./testvideo.mp4"
  const resolvedPath = path.resolve(videoPath);
  res.sendFile(resolvedPath);
  });

app.listen(8000, function () {
  console.log("Listening on port 8000!");
});



// const express = require("express");
// const app = express();
// const cors = require('cors');
// const path = require("path");
// var m3u8 = require('m3u8');
// var fs   = require('fs');


// // use port 3000 unless there exists a preconfigured port
// var port = process.env.PORT || 7000;



// app.use(cors({
//     origin: '*',
//     methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
// }));


// app.get('/video', function (req, res) {
//     const videoPath = "./testvideo.mp4"
//   const resolvedPath = path.resolve(videoPath);
//   res.sendFile(resolvedPath);
//   });

  
//   app.get("/videochunk", function (req, res) {
//     // Ensure there is a range given for the video
//     const range = req.headers.range;
//     console.log(range)
//     if (!range) {
//       res.status(400).send("Requires Range header");
//     }
  
//     // get video stats (about 61MB)
//     const videoPath = "testvideo.mp4";
//     const videoSize = fs.statSync("testvideo.mp4").size;
  
//     // Parse Range
//     // Example: "bytes=32324-"
//     const CHUNK_SIZE = 10 ** 6; // 1MB
//     const start = Number(range.replace(/\D/g, ""));
//     const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  
//     // Create headers
//     const contentLength = end - start + 1;
//     const headers = {
//       "Content-Range": `bytes ${start}-${end}/${videoSize}`,
//       "Accept-Ranges": "bytes",
//       "Content-Length": contentLength,
//       "Content-Type": "chunk",
//       "ip_address":Math.random(10)
//     };
  
//     // HTTP Status 206 for Partial Content
//     res.writeHead(206, headers);
  
//     // create video read stream for this particular chunk
//     const videoStream = fs.createReadStream(videoPath, { start, end });
  
//     var nodes=2
  
//     // Stream the video chunk to the client
  
//     // setTimeout(() => {
//     //   videoStream.pipe(res);
      
//     // }, 10000);
//     videoStream.pipe(res);
  
//   });

 

// app.listen(port, function () { 
//     console.log("Server is running on port 7000");
// });






