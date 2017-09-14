var db = require('../module/dao.js');
var formidable = require('formidable');
exports.login = (req,res)=>{
    var username = req.query.username;
    var password = req.query.password;
    if(username==''||password==''){
      var data={};
      data.status='error';
      data.content='用户名密码填写不完整';
      res.send(data);
    }else{
      db.find('users',{"username":username},(err,result)=>{
        if(err){
          console.log('查询用户数据失败');
          var data={};
          data.status='error';
          data.content='查询用户数据失败';
          res.send(data);
          console.log(result);
        }
        if(result==''){
          var data={};
          data.status='error';
          data.content='用户名不存在';
          res.send(data);
          console.log(result);
        }else{
         if(password==result[0].password){
           var data={};
           data.status='success';
           data.content='登陆成功！';
           data.id=result[0]._id;
           data.zh_name=result[0].zh_name;
           res.send(data);
         }else{
           var data={};
           data.status='error';
           data.content='密码错误！';
           res.send(data);
         }
        }
      });
    }
   
}
exports.userlist = (req,res)=>{
    var page = parseInt(req.query.page);
    var limit = parseInt(req.query.limit);
    var info = req.query.key;
    if(info==undefined){
       db.tablelist('users',{},{"pageSize":limit,pageNumber:page},(err,data)=>{
       if(err){
        console.log(Date()+'查询用户列表失败！');
        return;
       }
        else{
         var result={};
         result.code=0;
         result.msg='查询成功！';
         result.count = data.count;
         result.data = data.result;
         res.send(result);
         console.log(Date()+'查询数据成功！');
      }
     });
    }else{
      if(info.username==''&&info.zh_name!=''){
       var search={
         "zh_name":info.zh_name
       };
       db.tablelist('users',search,{"pageSize":limit,pageNumber:page},(err,data)=>{
        if(err){
          console.log('查询数据失败！');
          return;
        }
        else{
          var result={};
           result.code=0;
           result.msg='查询成功！';
           result.count = data.count;
           result.data = data.result;
           res.send(result);
           console.log(Date()+'查询数据成功！');
        }
      });
    }else if(info.username!=''&&info.zh_name==''){
      var search={
        "username":info.username
      };
      db.tablelist('users',search,{"pageSize":limit,pageNumber:page},(err,data)=>{
        if(err){
          console.log(Date()+'获取列表数据失败！');
          return;
        }
        else{
          var result={};
           result.code=0;
           result.msg='查询成功！';
           result.count = data.count;
           result.data = data.result;
           res.send(result);
           console.log(Date()+'获取列表数据成功！');
        }
      });
    }else if(info.username!=''&&info.zh_name!=''){
      var search={
        "username":info.username,
        "zh_name":info.zh_name
      };
      db.tablelist('users',search,{"pageSize":limit,pageNumber:page},(err,data)=>{
        if(err){
          console.log(Date()+'获取列表数据失败！');
          return;
        }
        else{
          var result={};
           result.code=0;
           result.msg='查询成功！';
           result.count = data.count;
           result.data = data.result;
           res.send(result);
           console.log(Date()+'获取列表数据成功！');
        }
      });
    }else{
      db.tablelist('users',{},{"pageSize":limit,pageNumber:page},(err,data)=>{
        if(err){
          console.log(Date()+'获取列表数据失败！');
          return;
        }
        else{
          var result={};
           result.code=0;
           result.msg='查询成功！';
           result.count = data.count;
           result.data = data.result;
           res.send(result);
           console.log(Date()+'获取列表数据成功！');
        }
      });
    }
    
    }
   
}
exports.register = (req,res)=>{
    var form = new formidable.IncomingForm(); 
    form.parse(req,function(err,fields){
       if(err){
        console.log(Date()+'解析数据失败！');
        return;
       }
      db.insertDB("users",{
          "username":fields.username,
          "zh_name":fields.zh_name,
          "age":fields.age,
          "phone":fields.phone,
          "email":fields.email,
          "password":fields.password,
          "job":fields.job,
          "sexy":fields.sexy,
          "note":fields.note
      },(err,result)=>{
         var info={};
         if(err){
          console.log(Date()+'插入数据失败');
          info.status="error";
          res.send(info);
          return;
        }
        else{
          console.log(Date()+'插入数据成功');
          info.status="success";
          res.send(info);
        }
      });
    });
   
}
exports.delete_user = (req,res)=>{
    var json={
          "username":req.query.username
       };
    db.delete('users',json,(err,result)=>{
                if (err) {
                  console.log(Date()+'删除用户数据失败');
                  var resdata={};
                  resdata.status='error';
                  resdata.content=err;
                  res.send(resdata);
                }else{
                  console.log(Date()+'删除用户数据成功');
                  var resdata={};
                  resdata.status='success';
                  resdata.content=result;
                  res.send(resdata);
                }
    });
}
exports.edit_user = (req,res)=>{
  var json1=req.query.findinfo;
  var json2=req.query.editinfo;
  db.update('users',json1,{$set:json2},(err,result)=>{
            if(err){
              console.log(Date()+'更改用户数据失败');
              var resdata={};
              resdata.status='error';
              resdata.content=err;
              res.send(resdata);
            }else{
              console.log(Date()+'更改用户数据成功');
              var resdata={};
              resdata.status='success';
              resdata.content=json2;
              res.send(resdata);
            }
             
  });
}