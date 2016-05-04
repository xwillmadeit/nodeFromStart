var events = require('events');
var emitter = new events.EventEmitter();

//监听事件(多个监听时间，按次序触发)
emitter.on('some events',doSomething);

emitter.on('some events',doSomething2);

//触发事件
setTimeout(function(){
	//第二个参数传值
	emitter.emit('some events','events fired');
},1000);

function doSomething(value){
	console.log('hello ' + value);
}

function doSomething2(){
	console.log('world');
}
