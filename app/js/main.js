layui.use(['form', 'layedit', 'laydate','element','table','jquery'], function(){
  var form = layui.form
  ,layer = layui.layer
  ,layedit = layui.layedit
  ,laydate = layui.laydate
  ,element = layui.element
  ,$ = layui.$ //引入jquery
  ,table = layui.table;
  $('#username').html(localStorage.getItem('zname'));
  table.render({
  elem: '#demo', //指定原始表格元素选择器（推荐id选择器）
  url: '/userlist',
  height: 450, //容器高度
  page: true,
  limits: [10,12,15,30,50],
  limit: 12, //默认采用60
  skin: 'row ', //行边框风格
  even: true ,//开启隔行背景
  id: 'idTest',
  cols: [[ 
          {
          checkbox: true
          }, {
            field: "username",
            title: "用户账号",  
            width: 120     
          }, {
            field: "zh_name",
            title: "用户名",  
            width: 120     
          }, {
            field: "age",
            title: "年龄",
            width: 100  
          }, {
            field: "sexy",
            title: "性别",
            width: 120  
          }, {
            field: "password",
            title: "密码",
            width: 120 
          }, {
            field: "phone",
            title: "手机号",
            width: 120 
          }, {
            field: "job",
            title: "职业",
            width: 100   
          },{
            field: "note",
            title: "备注",
            width: 200,
            edit:'text' 
          },{
            fixed: 'right',
            title: "操作",
            width:160,
            align:'center',
            toolbar: '#barDemo'
          }
  ]], //设置表头  
});
form.verify({
  title: function(value){
    if(value.length < 5){
      return '标题至少得5个字符啊';
    }
  }
  ,pass: [/(.+){6,12}$/, '密码必须6到12位']
  ,username: [/^\w{3,20}$/,'账号只能由由数字、26个英文字母或者下划线组成的字符串 ']
  ,char:[/^[\u4e00-\u9fa5]{0,}$/,'姓名只能输入汉字']
  ,content: function(value){
    layedit.sync(editIndex);
  },confirm:function(value){
       console.log(value);
       if(value!=$('#password').val()){
        return '两次输入的密码不一致！';
       }
  }
});
form.on('submit(search)', function(data){
  var content=data.field;
  console.log(content);  
  table.reload('idTest', {
    where: {
      key: {
        username: content.username,
        zh_name: content.zh_name
      }
    }
  });   
  return false;
});
 table.on('tool(table_list)', function(obj){
    var data = obj.data;
    if(obj.event === 'detail'){
      layer.msg('ID：'+ data._id + ' 的查看操作');
    } else if(obj.event === 'del'){
      layer.confirm('真的删除行么', function(index){
        $.get('/delete/user',{"username":data.username},function(data,status){
            console.log(data);
            obj.del();
            layer.close(index);
        });        
      });
    } else if(obj.event === 'edit'){
    var index = layer.open({
        type: 1
        ,title: '编辑用户信息' //不显示标题栏
        ,area: '300px;'
        ,shade: 0.8
        ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
   //     ,btn: ['确定更改', '关闭窗口']
        ,moveType: 1 //拖拽模式，0或者1
        ,content: '<div style="padding: 50px; line-height: 22px; background-color: #eee; color: #000; font-weight: 300;"><form class="layui-form" action="" lay-filter="test1">'+
        '<label class="layui-form-label">用户姓名：</label><br/>'+
        '<input type="text" name="zh_name" value="'+data.zh_name+'" lay-verify="required|char" placeholder="只可输入汉字" autocomplete="off" class="layui-input">'+
        '<label class="layui-form-label">用户备注：</label><br/>'+
        '<textarea placeholder="请输入内容"  class="layui-textarea" name="note" lay-verify="required" >'+data.note+'</textarea>'+
        '<div class="layui-form-item" style="padding:10px 0px;">'+
        '<a type="button" style="float:right;margin:5px;" class="layui-btn" lay-submit=""  lay-filter="edit_user">立即提交</a>'+
        '<button style="float:right;margin:5px;" type="reset" class="layui-btn layui-btn-primary">重置</button>'+
        ' </div>'+
        '<form></div>'
        ,success: function(layero){
          console.log(layero);
          form.on('submit(edit_user)', function(info){
               var editinfo = info.field;
               var findinfo={"username":data.username};
               console.log(info);
               $.get('/edit/user',{"findinfo":findinfo,"editinfo":editinfo},function(data,status){
                     if(data.status=='success'){                    
                      layer.alert('修改成功！',function(index) {                       
                        layer.close(index);
                      });
                      layer.close(index);
                      table.reload('idTest');
                     }else{
                      layer.close(index);
                      layer.msg('修改失败！'); 
                     }
               })
          });
        }
      });
    }
  });
$('#reset').click(function(){
  table.reload('idTest', {
    where: {     
    }
  });
});
});