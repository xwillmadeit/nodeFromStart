var request = require('superagent');
var events = require("events");
var userData = require('./userData');
var emitter = new events.EventEmitter();

var LOGINURL = '__';
var GOODSURL = '__';

emitter.on("setCookeie", getData); //事件监听

login();

/* 模拟登录获得cookie */
function login() {
    request
        .post(LOGINURL)
        .send(userData)
        .end(function(err, res){
            var cookie = res.header['set-cookie'];
            emitter.emit("setCookeie", cookie); //事件通知
        });
}

function getData(cookie) {

    setInterval(function(){
        request
        .get(GOODSURL)
        .set('Cookie',cookie[0])
        .end(function(err, res){
            //所有商品
            var goods = JSON.parse(res.text).data; 
            for(var i=0;i<goods.length;i++){
                console.log(goods[i].title);
            }
        });
    },3000);

}



