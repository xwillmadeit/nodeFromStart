var fs = require('fs');

//异步读取
fs.readFile('./text.txt',function(err,data){
    console.log('文件内容：'+data.toString());
});

//打开文件
fs.open('./text.txt','r+',function(err,fd){
    console.log('打开成功');
});

//文件信息
fs.stat('./text2.txt',function(err,stats){
    if(err){
        console.log(err);
    }else{
        console.log(stats.isDirectory());
    }
});

var data = 'bye bye kobe';
fs.writeFile('./text.txt',data,function(err){
    console.log('写入成功');
});

fs.mkdir('/tmp/test',function(err){
    if (err) {
       return console.error(err);
   }
   console.log("目录创建成功。");
});