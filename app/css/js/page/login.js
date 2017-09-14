//var working = false;
var a='succes';
$('.login').on('submit', function(e) {
	          $('.login').addClass('pulse')
		       $('#state_loading').show();
	           e.preventDefault();
	           var $this = $(this),
		         $state = $this.find('button > .state');
	           $state.html('登陆中');
	          if(a=='success'){
	          	   setTimeout(function() {	           	 
                        $('#state_loading').hide();
                        $('#state_success').show();
	                      $state.html('欢迎登陆订单管理系统!');
	                      $('.wrapper').css({
	                	     'background': 'rgba(4, 40, 68, 0)'
                         });
                        $('.login button').css({
                       	'background': 'rgb(70, 243, 93)'
                        })
                         setTimeout(function  () {
                         	 $('.login').removeClass('pulse');                	    
                	         window.location.href="index.html"
                           },1000);
	                }, 3000);
	          }else{
	          	setTimeout(function  () {
	          		   $('#state_loading').hide();
	          	     $('#state_fault').show();
	          	     $state.html('用户名或密码错误!');
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
	          	},3000)
	          	
	          }
});