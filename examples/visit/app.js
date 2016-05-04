var cron = require('node-schedule');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'weibatest'
});

//创建连接
connection.connect();

var rule = new cron.RecurrenceRule();
rule.second = [10,20,30,40];  //支持数组

var j = cron.scheduleJob(rule, function(){
	var insertSql = 'INSERT INTO views(id,create_at) VALUES (null,?)';
	var insertParams = [new Date()];

	connection.query(insertSql,insertParams,function(err, result) {
	  if (err) {
	  	console.log('error: '+err.message);
	  	return;
	  }

	  console.log('insertid: '+ result);
	});

  	console.log(new Date(),'插入了一条记录');
});

//任务结束，关闭连接
var endDate = new Date(2016, 04, 04, 10, 08, 00);
cron.scheduleJob(endDate, function(){
	var querySql = 'SELECT * FROM views';
	connection.query(querySql, function(err, result) {
	  if (err) {
	  	console.log('error: '+err.message);
	  	return;
	  }

	  console.log(result);
	});

	connection.end();//关闭数据库连接
	j.cancel();
    console.log(new Date(), '任务结束');    
});

/* This runs at 3:10AM every Friday, Saturday and Sunday. */
// var rule2 = new cron.RecurrenceRule();
// rule2.dayOfWeek = [5,6,0];
// rule2.hour = 3;
// rule2.minute = 10;
// cron.scheduleJob(rule2, function(){
//     console.log('This runs at 3:10AM every Friday, Saturday and Sunday.');
// });

/* This runs at 2:30AM on every Sunday */
// cron.scheduleJob({hour: 2, minute: 30, dayOfWeek: 0}, function(){
//     console.log('This runs at 2:30AM on every Sunday');
// });

//http://www.codexpedia.com/javascript/nodejs-cron-schedule-examples/