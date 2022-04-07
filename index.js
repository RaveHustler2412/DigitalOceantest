const express = require("express");
const app = express();
const fs = require("fs");

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/videochunk", function (req, res) {
  // Ensure there is a range given for the video
  const range = req.headers.range;
  console.log(range)
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  // get video stats (about 61MB)
  const videoPath = "testvideo.mp4";
  const videoSize = fs.statSync("testvideo.mp4").size;

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "chunk",
    "ip_address":Math.random(10)
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  var nodes=2

  // Stream the video chunk to the client

  // setTimeout(() => {
  //   videoStream.pipe(res);
    
  // }, 10000);
  videoStream.pipe(res);

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






