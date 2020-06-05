var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const ffmpeg = require('ffmpeg');
const { exec } = require("child_process");
// var appRoot = require('app-root-path');

var indexRouter = require('./routes/index');
var mixRouter = require('./routes/mix');
var getRecordingRouter = require('./routes/get-recording');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// enable file upload
app.use(fileUpload({
  createParentPath: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/mix', mixRouter);
app.use('/get-recording', getRecordingRouter)

app.get('/midi-files', function (req, res) {
  res.json({
    midis: [
      {
        id: "uibhist_mo_ghraidh",
        title: "Uibhist Mo Graidh",
        route: "/midi/uibhist_mo_ghraidh.mp3"
      }, {
        id: "chi_mi_na_morbhenna",
        title: "Chi Mi Na Morbhenna",
        route: "/midi/chi_mi_na_morbhenna.mp3"
      }
    ]
  })
});

app.post('/upload', async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded'
      });
    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      let recording = req.files.recording;
      recording.mv(`./public/recordings/${req.body.songID}/${req.body.partID}/${req.body.uid}-${req.body.songID}-${req.body.partID}.wav`);
      const mixCmd = exec(`
      set - e &&
      cd ./public/recordings/${req.body.songID}/${req.body.partID} &&
      pwd && ls -a &&
      sox "|opusdec --force-wav ${req.body.uid}-${req.body.songID}-${req.body.partID}.wav -" ${req.body.uid}-${req.body.songID}-${req.body.partID}.mp3 &&
      echo File has been transcoded.
      `, (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      });
      mixCmd.on('exit', function (code) {
        console.log('Child process exited with exit code ' + code);
      });

      // sox /public/recordings/${req.body.songID}/${req.body.partID}/${req.body.uid}-${req.body.songID}-${req.body.partID}.wav ./public/recordings/${req.body.songID}/${req.body.partID}/${req.body.uid}-${req.body.songID}-${req.body.partID}.mp3 &&

      //send response
      res.send({
        status: true,
        message: 'File is uploaded',
        data: {
        }
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(8000, function () {
  console.log('CORS-enabled web server listening on port 8000');
})