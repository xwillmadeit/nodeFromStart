var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'weibatest'
});

connection.connect();

var querySql = 'SELECT * FROM views';

var insertSql = 'INSERT INTO views(id,name) VALUES (null,?)';
var insertParams = ['kobe'];

var updateSql = 'update views set name = ? where id = 3';
var updateParams = ['kobe bryant'];

var deleteSql = 'delete from views where id = 3';

//新增
// connection.query(insertSql,insertParams,function(err, result) {
//   if (err) {
//   	console.log('error: '+err.message);
//   	return;
//   }

//   console.log('insertid: '+ result);
// });

//删除
// connection.query(deleteSql,function(err, result) {
//   if (err) {
//   	console.log('error: '+err.message);
//   	return;
//   }

//   console.log('affectedRows: '+ result.affectedRows);
// });

//修改
// connection.query(updateSql,updateParams,function(err, result) {
//   if (err) {
//   	console.log('error: '+err.message);
//   	return;
//   }

//   console.log('affectedRows: '+ result.affectedRows);
// });

//查询
// connection.query(querySql, function(err, result) {
//   if (err) {
//   	console.log('error: '+err.message);
//   	return;
//   }

//   console.log(result);
// });

connection.end();