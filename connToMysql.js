const mysql = require('mysql'); //调用MySQL模块

//创建一个connection
var connection = mysql.createConnection({
  host: '127.0.0.1', //主机
  port: '3306', //端口号
  user: 'root', //MySQL认证用户名
  password: '1905', //MySQL认证用户密码
  database: 'test',
});

//连接数据库
connection.connect(function (err) {
  if (err) {
    console.log('[query] - :' + err);
    return;
  }
  console.log('[connection connect]  succeed!');
});

//执行SQL语句
// connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
//   if (err) {
//     console.log('[query] - :' + err);
//     return;
//   }
//   console.log('The solution is: ', rows[0].solution);
// });
let id = 2 + ' and 1=2 union select 1,TABLE_NAME,3,4 from information_schema.tables where table_schema = database() limit 0,1';
let sql = 'select * from test.student where id=' + id;
console.log('sql is: ' + sql);
let res = {};
connection.query(sql, function (err, rows, fields) {
  if (err) {
    console.log('[query] - :' + err);
    return;
  }
  console.log(rows);
  res.name = rows[0].name;
  res.birth = rows[0].birth;
  console.log('The solution is: ', res);
});

//关闭connection
connection.end(function (err) {
  if (err) {
    return;
  }
  console.log('[connection end] succeed!');
});
