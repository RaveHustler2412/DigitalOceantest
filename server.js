const express = require("express");
const app = express();
const cors = require('cors');

// use port 3000 unless there exists a preconfigured port
var port = process.env.PORT || 3000;



app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));


app.get('/', function (req, res) {
    res.send('Hello World!');
  });

app.listen(port, function () { 
    console.log("Server is running on port 3000");
});






