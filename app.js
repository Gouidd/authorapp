var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require("http");
const fs = require('fs').promises;
const host = 'https://authorsapp.000webhostapp.com/';
const port = 3000;

const requestListener = function (req, res) {
    res.setHeader("Content-Type", "application/json");
    switch (req.url) {
        case "/authors":
          var mysql = require('mysql');
          var conn = mysql.createConnection({
              host: 'https://authorsapp.000webhostapp.com/'
              user: 'root'     
              password: ''      
              database: 'newdb' 
            }); 
            conn.connect(function(err) {
              if (err) throw err;
              console.log('Database is connected successfully !');
            });
            var sql='SELECT * FROM authors';
            conn.query(sql, function(err, result,fields) {
              if(err) throw err;
              console.log(result);
              var data = JSON.stringify(result);
              res.writeHead(200);
              res.end(data);
            });

            break
        default:
          fs.readFile(__dirname + "/server/index.html")
          .then(contents => {
              res.setHeader("Content-Type", "text/html");
              res.writeHead(200);
              res.end(contents);
          })
          .catch(err => {
              res.writeHead(500);
              res.end(err);
              return;
          });
    }
}


const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
