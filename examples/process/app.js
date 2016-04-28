var express = require('express');
var cp = require('child_process');

var app = express();

//process.env.PORT 对象默认为 undefined
//可使用 set PORT=3001 设置
app.set('port',process.env.PORT || 3000);

console.log(process.version); //包含当前node实例的版本号；
console.log(process.env.PORT); //当前运行端口号
console.log(process.uptime()); //包含当前进程运行的时长（秒）；
console.log(process.pid); //获取进程id;
console.log(process.title); //设置进程名称
console.log(process.memoryUsage()); //node进程内存的使用情况，rss代表ram的使用情况，vsize代表总内存的使用大小，包括ram和swap；
//process.exit(); //结束进程，下面不会执行

process.stdout.write('using stdout' + '\n'); //process.stdout用来控制标准输出，也就是在命令行窗口向用户显示内容。它的write方法等同于console.log

setTimeout(function(){
  console.log(process.uptime());
},3000);

cp.stdin.write('23456');

cp.exec('dir',function(e, stdout, stderr) {
    console.log('e：'+e);
    console.log('stdout：'+stdout);
    console.log('stderr：'+stderr);
　　if(!e) {
　　　　console.log(stdout);
　　　　console.log(stderr);
　　}
});

//http://nodejs.cn/doc/node/process.html#process_process

app.listen(app.get('post'),function(){
  console.log('app is listening to port ' + app.get('port'));
})