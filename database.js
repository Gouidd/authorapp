var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'https://authorsapp.000webhostapp.com/', // Replace with your host name
  user: 'root',      // Replace with your database username
  password: '',      // Replace with your database password
  database: 'newdb' // // Replace with your database Name
}); 
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;