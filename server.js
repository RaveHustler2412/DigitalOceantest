const express = require("express");
const app = express();
const cors = require('cors');
const path = require("path");


// use port 3000 unless there exists a preconfigured port
var port = process.env.PORT || 7000;



app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));


app.get('/', function (req, res) {
    const videoPath = "./uploads/sample1.mp4"
  const resolvedPath = path.resolve(videoPath);
  res.sendFile(resolvedPath);
  });

app.listen(port, function () { 
    console.log("Server is running on port 3000");
});






