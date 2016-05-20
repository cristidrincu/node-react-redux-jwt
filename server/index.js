/**
 * Created by cristiandrincu on 5/20/16.
 */
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const dBConfig = require('./config').dbConfigCredentials;

try{
    mongoose.connect('mongodb://' + dBConfig.mongoUser + ':' + dBConfig.mongoPass + '@ds025232.mlab.com:25232/reactnodejwt');
} catch(e) {
    console.log(e.message);
}


app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on: ' + port);