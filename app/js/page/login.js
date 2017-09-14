//var working = false;
$('.login').on('submit', function(e) {
	          $('.login').addClass('pulse')
		       $('#state_loading').show();
	           e.preventDefault();
	           var $this = $(this),
		        $state = $this.find('button > .state');
	           $state.html('登陆中');
	           var username=$('#username').val().trim();
	           var password=$('#password').val().trim();
	           if(username==''){
                    setTimeout(function  () {
	          		 $('#state_loading').hide();
	          	     $('#state_fault').show();
	          	     $state.html('用户名不能为空！');
	          	     $('.login').removeClass('pulse zoomInUp');
	          	     $('.login').addClass('shake')
	          	     $('.wrapper').css({
	                	     'background': 'rgba(4, 40, 68, 0)'
                         });
                   $('.login button').css({
                       	'background': '#e44924',
                        })
                  setTimeout(function  () {
                      $state.html('登陆');
                      $('#state_fault').hide();
                      $('.login button').css({
                       	 'background': ' #2196F3'
                          });
                      $('.login').removeClass('shake'); 
                      $('.wrapper').css({
	                	      'background': 'rgba(4, 40, 68, 0.5)'
                          });
                },1000);
	          	},2000);
	           }else if(password==''){
                      setTimeout(function  () {
	          		 $('#state_loading').hide();
	          	     $('#state_fault').show();
	          	     $state.html('密码不能为空！');
	          	     $('.login').removeClass('pulse zoomInUp');
	          	     $('.login').addClass('shake')
	          	     $('.wrapper').css({
	                	     'background': 'rgba(4, 40, 68, 0)'
                         });
                   $('.login button').css({
                       	'background': '#e44924',
                        })
                  setTimeout(function  () {
                      $state.html('登陆');
                      $('#state_fault').hide();
                      $('.login button').css({
                       	 'background': ' #2196F3'
                          });
                      $('.login').removeClass('shake'); 
                      $('.wrapper').css({
	                	      'background': 'rgba(4, 40, 68, 0.5)'
                          });
                },1000);
	          	},2000);

	           }else{
               $.get('/login',{"username":username,"password":password},function(data,status){
                   console.log(data);
                   if(data.status=='success'){
	          	   setTimeout(function() {	           	 
                        $('#state_loading').hide();
                        $('#state_success').show();
	                      $state.html('欢迎登陆用户管理系统!');
	                      $('.wrapper').css({
	                	     'background': 'rgba(4, 40, 68, 0)'
                         });
                        $('.login button').css({
                       	'background': 'rgb(70, 243, 93)'
                        })
                         setTimeout(function  () {
                         	 $('.login').removeClass('pulse');  
                         	  localStorage.setItem('token',data.id); 
                         	  localStorage.setItem('name',username); 
                            localStorage.setItem('zname',data.zh_name);       	    
                	         window.location.href="main.html"
                           },1000);
	                }, 2000);
	            }else{
	          	setTimeout(function  () {
	          		 $('#state_loading').hide();
	          	     $('#state_fault').show();
	          	     $state.html(data.content);
	          	     $('.login').removeClass('pulse zoomInUp');
	          	     $('.login').addClass('shake')
	          	     $('.wrapper').css({
	                	     'background': 'rgba(4, 40, 68, 0)'
                         });
                   $('.login button').css({
                       	'background': '#e44924',
                        })
                  setTimeout(function  () {
                      $state.html('登陆');
                      $('#state_fault').hide();
                      $('.login button').css({
                       	 'background': ' #2196F3'
                          });
                      $('.login').removeClass('shake'); 
                      $('.wrapper').css({
	                	      'background': 'rgba(4, 40, 68, 0.5)'
                          });
                },2000);
	          	},2000);	          	
	           }
	           });
	           }
	           
	           
});