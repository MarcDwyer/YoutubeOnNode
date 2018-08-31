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
//var indexRouter = require('./routes/index');
class getUser {
  constructor(name, url, vidid) {
    this.name = name;
    this.url = url;
    this.videoid = vidid;
  }
  getData() {
    fetch(this.url)
    .then((res) => res.json())
    .then(data => {
      const newdata = JSON.stringify(data);
      fs.writeFile(`public/homepage/fetches/${this.name}.json`, newdata, finished)
      if (!data.pageInfo.totalResults == 0) {
      this.videoid = data.items[0].id.videoId;
      console.log(this.videoid , data.items[0].id.videoId)
      }
      function finished() {
        console.log('JSON stored...')
      }
    }).then(() => {
      if (this.videoid == undefined) return;
      getStats(this.videoid, this.name);
    });

}
}

let ice = new getUser('ice', 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCv9Edl_WbtbPeURPtFDo-uA&eventType=live&type=video&key=AIzaSyAxfrRQxi1QW-ilyKqXPXqqI-Woq0Ocm5I');
let hyphonix = new getUser('hyphonix', 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCn0Fbg9fPbtMIh3xUyCDx8g&eventType=live&type=video&key=AIzaSyAxfrRQxi1QW-ilyKqXPXqqI-Woq0Ocm5I');
let tsa = new getUser('tsa', 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCB0H_1M78_jwTyfaJuP241g&eventType=live&type=video&key=AIzaSyAxfrRQxi1QW-ilyKqXPXqqI-Woq0Ocm5I');
let destiny = new getUser('destiny', 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UC554eY5jNUfDq3yDOJYirOQ&eventType=live&type=video&key=AIzaSyAxfrRQxi1QW-ilyKqXPXqqI-Woq0Ocm5I');
let mix = new getUser('mix', 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UC_jxnWLGJ2eQK4en3UblKEw&eventType=live&type=video&key=AIzaSyAxfrRQxi1QW-ilyKqXPXqqI-Woq0Ocm5I');
let marie = new getUser('marie', 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UC16fss-5fnGp2Drqp1iT9pA&eventType=live&type=video&key=AIzaSyAxfrRQxi1QW-ilyKqXPXqqI-Woq0Ocm5I');
let burger = new getUser('burger', 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCJNILr75xb9zKpUI0RV7pmQ&eventType=live&type=video&key=AIzaSyAxfrRQxi1QW-ilyKqXPXqqI-Woq0Ocm5I');

fetcher();
setInterval(fetcher, 240000)
function fetcher() {
  mix.getData();
  ice.getData();
  tsa.getData();
  hyphonix.getData();
  destiny.getData();
  marie.getData();
  burger.getData();
}

function getStats(vidnum, name) {
  console.log(vidnum);
  fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2CliveStreamingDetails&id=${vidnum}&key=AIzaSyAxfrRQxi1QW-ilyKqXPXqqI-Woq0Ocm5I`)
  .then((res) => res.json())
  .then((data) => {
    const newdata = JSON.stringify(data);
    fs.writeFile(`public/homepage/fetches/${name}stats.json`, newdata, finished)
    function finished(err) {
      console.log(`Stats have been applied..`);
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
