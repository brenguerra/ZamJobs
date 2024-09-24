const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const connectDatabase = require('./config/db');
const port = process.env.HTTP_PORT || 5000;
const app = express();
const cors = require('cors');
const morgan = require('morgan')
const passport = require('passport');
const path = require('path');
const cluster = require('cluster');
const totalCPUs = require('os').cpus().length;
const createRoles = require('./util/createRoles')
const http = require('http');
const https = require('https');
const fs = require('fs');

// Middle ware
const errorHandler = require('./middleware/error');

// Routes
const authRouter = require('./routes/auth');
const jobRouter = require('./routes/jobs');
const photoRouter = require('./routes/photos');
const contractRouter = require('./routes/contracts')
const offerRouter = require('./routes/offer');
const ratingRouter = require('./routes/rating')
const userRouter = require('./routes/user');
const chatRouter = require('./routes/conversation');
const messageRouter = require('./routes/message');
const applicationRouter =require('./routes/application');
const adminRouter =require('./routes/admin');

connectDatabase();
require('./models/Application');
app.use(cors());
app.disable('x-powered-by');
app.use(morgan('dev'));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit:100000}));
app.use(passport.initialize());
app.use('/uploads', express.static('files'));
app.use('/users', express.static('uploads'));
require('./config/passport');

app.get('/test', (req, res)=> {
  res.sendFile(path.resolve('test/test.html'));
});

app.use('/api/v1/auth/', authRouter);
app.use('/api/admin/v1',passport.authenticate('jwt', {session:false}), adminRouter);
app.use('/api/v1/users/',passport.authenticate('jwt', {session:false}), userRouter);
app.use('/api/v1/chat/', passport.authenticate('jwt', {session:false}), chatRouter);
app.use('/api/v1/chat/message/', passport.authenticate('jwt', {session:false}), messageRouter);
app.use('/api/v1/contracts/', passport.authenticate('jwt', {session:false}), contractRouter);
app.use('/api/v1/jobs/', passport.authenticate('jwt', {session:false}), jobRouter);
app.use('/api/v1/photos/', passport.authenticate('jwt', {session:false}), photoRouter);
app.use('/api/v1/ratings/', passport.authenticate('jwt', {session:false}), ratingRouter);
app.use('/api/v1/offers/', passport.authenticate('jwt', {session:false}), offerRouter);
app.use('/api/v1/applications/',passport.authenticate('jwt', {session:false}), applicationRouter);

// serve front end
if(process.env.NODE_ENV==='production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req,res) => {
    return res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
      );
  })
}
app.use(errorHandler);

const options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.cert"),
};

https.createServer(options, app).listen(process.env.HTTPS_PORT, function(){
  console.log(`listening on *:${process.env.HTTPS_PORT}`);
});
http.createServer(app).listen(port, () => {
  console.log(`Server running on http://localhost:${port}`.blue.underline);
});





