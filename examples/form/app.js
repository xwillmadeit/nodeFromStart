var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function(req, res){
  // The form's action is '/' and its method is 'POST',
  // so the `app.post('/', ...` route will receive the
  // result of our form
  var html = '<form action="/" method="post">' +
               'Enter your name:' +
               '<input type="text" name="userName" placeholder="userName" />' +
               '<input type="text" name="password" placeholder="password" />' +
               '<br>' +
               '<button type="submit">Submit</button>' +
            '</form>';
               
  res.send(html);
})

app.post('/', function(req, res){
  var userName = req.body.userName;
  var password = req.body.password;
  if(userName!== 'xwill' || password !== '123456'){
    res.send('sorry'); //返回，不会运行下面代码
  }
  var html = 'Hello: ' + userName + '.<br>' +
             '<a href="/">Try again.</a>';
    res.send(html);
})

app.listen(3000, function () {
  console.log('app is listening at port 3000');
});