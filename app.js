var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');
const fetch = require('node-fetch');

//var indexRouter = require('./routes/index');


fetcher();
setInterval(fetcher, 180000);
function fetcher() {
  // ice
  fetch ('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCv9Edl_WbtbPeURPtFDo-uA&eventType=live&type=video&key=AIzaSyAxfrRQxi1QW-ilyKqXPXqqI-Woq0Ocm5I')
  .then((res) => res.json())
  .then((data) => {
    const newdata = JSON.stringify(data);
    fs.writeFile('public/homepage/fetches/ice.json', newdata, finished)
    if (!data.pageInfo.totalResults == 0) {
      getStats(data.items[0].id.videoId, 'ice');
    }
    function finished(err) {
      console.log('Ice JSON requested and stored');
    }
  });
  //hyphonix
  fetch ('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCaFpm67qMk1W1wJkFhGXucA&eventType=live&type=video&key=AIzaSyAxfrRQxi1QW-ilyKqXPXqqI-Woq0Ocm5I')
  .then((res) => res.json())
  .then((data) => {
    const newdata = JSON.stringify(data);
    fs.writeFile('public/homepage/fetches/hyphonix.json', newdata, finished)
    if (!data.pageInfo.totalResults == 0) {
      getStats(data.items[0].id.videoId, 'hyphonix');
    }
    function finished(err) {
      console.log('Hyphonix JSON requested and stored');
    }
  })
    
  // tsa
  fetch ('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCB0H_1M78_jwTyfaJuP241g&eventType=live&type=video&key=AIzaSyAxfrRQxi1QW-ilyKqXPXqqI-Woq0Ocm5I')
  .then((res) => res.json())
  .then((data) => {
    const newdata = JSON.stringify(data);
    fs.writeFile('public/homepage/fetches/tsa.json', newdata, finished)
    if (!data.pageInfo.totalResults == 0) {
      getStats(data.items[0].id.videoId, 'tsa');
    }
    function finished(err) {
      console.log('TSA JSON requested and stored');
    }
  });
  //destiny
  fetch ('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UC554eY5jNUfDq3yDOJYirOQ&eventType=live&type=video&key=AIzaSyAxfrRQxi1QW-ilyKqXPXqqI-Woq0Ocm5I')
  .then((res) => res.json())
  .then((data) => {
    const newdata = JSON.stringify(data);
    fs.writeFile('public/homepage/fetches/destiny.json', newdata, finished)
    if (!data.pageInfo.totalResults == 0) {
      getStats(data.items[0].id.videoId, 'destiny');
    }
    function finished(err) {
      console.log('Destiny JSON requested and stored');
    }
  });
}

function getStats(vidnum, name) {
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
