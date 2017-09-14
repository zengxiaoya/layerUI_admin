console.time('time');
console.log('开启node环境中...');

var express = require("express");
var app = express();
var controller = require('./controller/controller.js');
app.use(express.static('./app'));

console.log('服务启动：http://localhost:4000');


app.get("/login",controller.login);
app.get("/userlist",controller.userlist);
app.post("/register",controller.register);
app.get("/delete/user",controller.delete_user);
app.get("/edit/user",controller.edit_user);
app.listen(4000);
console.timeEnd('time');