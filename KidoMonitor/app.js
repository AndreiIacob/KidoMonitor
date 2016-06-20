var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var index = require('./routes/index');
var login = require('./routes/login');
var nearby = require('./routes/nearby');
var settings = require('./routes/settings');
var signup = require('./routes/signup');
var postit = require('./routes/postit');


var text = '{"kids":[' +
'{"id":"kido", "latitude":"Doe", "longitude":"Doe"},' +
'{"id":"Mary", "latitude":"Doe", "longitude":"Doe"},' +
'{"id":"Don", "latitude":"Doe", "longitude":"Doe"}]}';
var data = JSON.parse(text);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/login', login);
app.use('/nearby', nearby);
app.use('/settings', settings);
app.use('/signup', signup);
app.use('/postit', postit);

/*setInterval(function() {
  function includeJs(jsFilePath) {
    var js = document.createElement("script");

    js.type = "text/javascript";
    js.src = jsFilePath;

    document.body.appendChild(js);
  }

  includeJs("./public/javascripts/pn");
  var PUBNUB_demo = PUBNUB.init({
    publish_key: 'pub-c-3d4d491c-4c9c-48e6-acc1-58b18d9d484d',
    subscribe_key: 'sub-c-f372af62-3687-11e6-9f5c-0619f8945a4f'
  });

  PUBNUB_demo.subscribe({
    channel: 'demo_tutorial',
    message: function (m) {
      for (var i=0; i<data.length; i++) {
        if (data[i].id == m.Name) {
          data[i].latitude = m.Latitude;
          data[i].longitude = m.Longitude;
          break;
        }
      }
    },
    connect: publish
  });

  function publish() {
    PUBNUB_demo.publish({});
  }
}, 3000);

setInterval(function(){
  console.log(data);
}, 3000);*/



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
(function wait () {
  if (1) setTimeout(wait, 1000);
})();
