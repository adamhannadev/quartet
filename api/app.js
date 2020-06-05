var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');
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
        id: "suas_leis",
        title: "Suas Leis A' Ghaidhlig",
        route: "/midi/suas_leis.mp3"
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

      //Use the mv() method to place the file in upload directory (i.e. "uploads")
      recording.mv(`./public/recordings/${req.body.songID}/${req.body.partID}/${req.body.uid}-${req.body.songID}-${req.body.partID}.mp3`);

      //send response
      res.send({
        status: true,
        message: 'File is uploaded',
        data: {
          mimetype: recording.mimetype,
          size: recording.size
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