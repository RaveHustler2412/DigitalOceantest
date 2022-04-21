const HLSServer = require('hls-server');
const server = new HLSServer(); // If no config is provided it will use the default options
server.run();

// server.addStream('stream1', require('./media/demo7.mp4'));
server.addStream('stream3', 'http://clappr.io/highline.mp4')