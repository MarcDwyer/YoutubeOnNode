var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const fetch = require('node-fetch');
const poll =  require('./routes/poll.js');
const minify = require('babel-minify');
//var indexRouter = require('./routes/index');

const API = 'AIzaSyBghJmzrFiYYr4ClicgFYHvN4ubVsnJxuE';
class getUser {
  constructor(name, channelId, vidid) {
    this.name = name;
    this.channelId = channelId;
    this.videoid = vidid;
  }
  getData() {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${this.channelId}&eventType=live&type=video&key=${API}`)
    .then((res) => res.json())
    .then(data => {
      const newdata = JSON.stringify(data);
      fs.writeFile(`public/homepage/fetches/${this.name}.json`, newdata, finished)
      if (!data.pageInfo.totalResults == 0) {
      this.videoid = data.items[0].id.videoId;
      }
      function finished() {
        console.log('JSON stored...')
      }
    }).then(() => {
      if (this.videoid == undefined) return;
      getStats(this.videoid, this.name);
    }).catch((err) => {
      console.log('ERROR 404')
    })

}
}

let ice = new getUser('ice', 'UCv9Edl_WbtbPeURPtFDo-uA');
let hyphonix = new getUser('hyphonix', 'UC4abN4ZiybnsAXTkTBX7now');
let tsa = new getUser('tsa', 'UCB0H_1M78_jwTyfaJuP241g');
let destiny = new getUser('destiny', 'UC554eY5jNUfDq3yDOJYirOQ');
let mix = new getUser('mix', 'UC_jxnWLGJ2eQK4en3UblKEw');
let marie = new getUser('marie', 'UC16fss-5fnGp2Drqp1iT9pA');
let burger = new getUser('burger', 'UCJNILr75xb9zKpUI0RV7pmQ');
let cxnews = new getUser('cxnews', 'UCStEQ9BjMLjHTHLNA6cY9vg');
let chilledcow = new getUser('chilledcow', 'UCSJ4gkVC6NrvII8umztf0Ow');
let lol = new getUser('lol', 'UCvqRdlKsE5Q8mf8YXbdIJLw');

fetcher();
setInterval(fetcher, 180000)
function fetcher() {
  mix.getData();
  ice.getData();
  tsa.getData();
  hyphonix.getData();
  destiny.getData();
  marie.getData();
  burger.getData();
  cxnews.getData();
  chilledcow.getData();
  lol.getData();
}

function getStats(vidnum, name) {
  fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2CliveStreamingDetails&id=${vidnum}&key=${API}`)
  .then((res) => res.json())
  .then((data) => {
    const newdata = JSON.stringify(data);
    fs.writeFile(`public/homepage/fetches/${name}stats.json`, newdata, finished)
    function finished(err) {
    }
  })
}



var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use('/poll', poll);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', express.static('public/homepage'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
