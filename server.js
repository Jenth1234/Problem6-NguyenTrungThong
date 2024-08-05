const express = require('express');
const bodyParser = require('body-parser');
const dbConnect = require('./config/dbconnect');
require('dotenv').config(); 
const http = require('http');
const socketIo = require('socket.io');
const route = require('./router');
const socketConfig = require('./config/socketConfig');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use((req, res, next) => {
  req.io = io;
  next();
});

socketConfig(io);

const port = process.env.PORT || 3050;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static('public'));

dbConnect();
route(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
