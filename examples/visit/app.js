var cron = require('node-schedule');
var mysql      = require('mysql');
var mysqlConfig = require('./config');
var connection = mysql.createConnection(mysqlConfig);

//创建连接
connection.connect();

var rule = new cron.RecurrenceRule();
rule.second = [10,20,30,40,50];  //支持数组

var j = cron.scheduleJob(rule, function(){
	var insertSql = 'INSERT INTO views(id,create_at) VALUES (null,?)';
	var currTime = new Date();

	var insertParams = currTime;

	connection.query(insertSql,insertParams,function(err, result) {
	  if (err) {
	  	console.log('error: '+err.message);
	  	return;
	  }

	  console.log('insertid: '+ JSON.stringify(result));
	});

  	console.log(currTime,'插入了一条记录');
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

//http://www.codexpedia.com/javascript/nodejs-cron-schedule-examples/