var MongoClient = require("mongodb").MongoClient;

function _conllnectDB(callback){
    var url= 'mongodb://localhost:27017/pcba';
    MongoClient.connect(url,(err,db)=>{
        if(err){
            console.log('数据连接失败！');
            return;
        }
        console.log(Date()+'localhost:27017端口数据连接成功！');
        callback(err,db);
   });    
}
//插入数据
exports.insertDB = (collectionName,json,callback)=>{
    _conllnectDB((err,db)=>{
           db.collection(collectionName).insertOne(json,(err,result)=>{
              callback(err,result);
              db.close();
           });
    });
}
//查询数据
exports.find = (collectionName,json,callback)=>{
    var result =[];
    //应该省略的条数
    _conllnectDB((err,db)=>{
      var cursor =db.collection(collectionName).find(json);
      cursor.each((err,doc)=>{
          if(err){
              callback(err,null);
              db.close();
              return;
          }
          if(doc!=null){
            result.push(doc);
          }else{
              //遍历结束，返回数据给service层
              callback(null,result);
              db.close();
          }
      })
 });
}
exports.tablelist = (collectionName,json,args,callback)=>{
    arr=[];
    var info={};
    info.result =[];
    //应该省略的条数
    var skipNumber = (args.pageNumber-1)*args.pageSize;
    //每页 显示的条数
    var limit = args.pageSize;
    _conllnectDB((err,db)=>{
      var cursor =db.collection(collectionName).find(json).limit(limit).skip(skipNumber);
      var count  =db.collection(collectionName).find(json);
      count.each((err,doc)=>{
          if(err){
              callback(err,null);
              db.close();
              return;
          }
          if(doc!=null){
          arr.push(doc);
          }else{
             info.count = arr.length;
            cursor.each((err,doc)=>{
             if(err){
                callback(err,null);
                db.close();
                return;
              }
              if(doc!=null){
              info.result.push(doc);
              }else{
              //遍历结束，返回数据给service层
              callback(null,info);
              db.close();
              }
            });
          }
      });
      

 });
}
exports.delete = (collectionName,json,callback)=>{
  _conllnectDB((err,db)=>{
        db.collection(collectionName).deleteMany(json,(err,results)=>{
                 callback(err,results);
                 db.close();
        });
  });
}
exports.update = (collectionName,json1,json2,callback)=>{
    _conllnectDB((err,db)=>{
          db.collection(collectionName).updateMany(json1,json2,(err,results)=>{
            callback(err,results);
            db.close();
          });
    });
  }