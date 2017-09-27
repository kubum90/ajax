var meta=meta || {};
meta.common=(function(){
   var init=function(ctx){
      onCreate();
      meta.session.init(ctx);
      meta.index.init();
   };
   var onCreate=function(){
      setContentView();
   };
   var setContentView=function(){};
   return { init:init };
})();
meta.index=(function(){
   var $wrapper,$navbar,$container,ctx,img,js,css,
      temp,algo;
   var init=function(){
         ctx=$$('x');
         js=$$('j');
         temp=js+'/template.js';
         algo=js+'/algo.js';
         $navbar=$('#navbar');
         $container=$('#container');
         img=$$('i');
         onCreate();
      };
   var onCreate=function(){
      $.getScript(temp,()=>{
         compUI.div('content').css({'width':'100%'}).appendTo($container);
         $content=$('#content');
         compUI.image('loading',img+'/loading.gif').css({'width':'40%','margin':'0 auto'}).appendTo($content);
         compUI.h1('hBtn').attr('display','inline').appendTo($content);
         $hBtn=$('#hBtn');
         
         compUI.span('bbsBtn').html('게시판관리').addClass('label label-danger').css({'margin-left':'10px'}).appendTo($hBtn).click(()=>{
            alert('게시판 가기');
            var url=ctx+'/list/articles';
            $.getJSON(url,data=>{
               alert('Data msg is  '+data.msg);
               //여기서 부터 보드 게시판 동적 UI코딩
               $('#navbar').html(introUI.navbar());//네비 바 넣고
               $container.empty();//컨테이너 비우고
               $container.append(compUI.div('content')).css({'width':'100%'});//컨텐츠 컨테이너 넣고
               $('#content').css({'width':'80%','margin':'0 auto'});//컨텐츠 정렬
               $('#navbar').append(bbsUI.search());
               compUI.span('bbsBtn').html('게시').addClass('label label-danger').css({'margin-left':'10px'}).appendTo($('#navbar'));
               $('#content').html(bbsUI.tbl()); //스트링값으로 헤더 받아오는 경우
               alert('게시글 수'+data.total.count);
               $('#total').append(data.total.count+'개');
               $('#content').append(bbsUI.pagenation()).css({'width':'100%'});
               var a=[
                  {
                     a : 1,
                     b : '한국인사',
                     c : '안녕',
                     d : '길동',
                     e : '2017-09-10',
                     f : 10
                  },
                  {
                     a : 2,
                     b : '미국인사',
                     c : 'Hello',
                     d : 'James',
                     e : '2017-09-10',
                     f : 20
                  },
                  {
                     a : 3,
                     b : '중국인사',
                     c : '니하오',
                     d : '마오',
                     e : '2017-09-10',
                     f : 30
                  },
                  {   
                     a : 4,
                     b : '일본인사',
                     c : '니하오',
                     d : '아베',
                     e : '2017-09-10',
                     f : 40
                  },
                  {
                     a : 5,
                     b : '태국인사',
                     c : '사와디캄',
                     d : '창',
                     e : '2017-09-10',
                     f : 50
                  }
               ];
               var tr='';
               alert('결과 : '+data.result);
               $.each(data.list,(i,j)=>{
                  tr+= '<tr style="height: 25px;">'
                     +'<td>'+j.articleSeq+'</td>'
                     +'<td><a onclick="meta.board.detail('+j.articleSeq+')">'+j.title+'</a></td>'
                     +'<td>'+j.content+'</td>'
                     +'<td>'+j.id+'</td>'
                     +'<td>'+j.regdate+'</td>'
                     +'<td>'+j.hitcount+'</td>'
                     +'</tr>';
               });
               console.log('tr : '+tr);
               //$content.html(tbl);
               $('#tbody').html(tr);
               
            });
         });

         
         $('#hBtn').append(compUI.span('btn1')).attr('display','inline');
         $('#btn1').html('알고리즘').addClass('label label-default').css({'margin-left':'10px'});
         $('#hBtn').append(compUI.span('btn2')).attr('display','inline');
         $('#btn2').html('회원관리').addClass('label label-primary').css({'margin-left':'10px'});
         $('#btn1').click(()=>{
            $container.empty();
            //meta.auth.init();   
            meta.navbar.init();
            $container.html(algoUI.series());
            $('#start_txt').after(compUI.input('start','text'));
            $('#start').attr('placeholder','시작값');
            $('#end_txt').after(compUI.input('end','text'));
            $('#end').attr('placeholder','끝값');
            $('#result').before(compUI.input('resultBtn','button'));
            $('#resultBtn').val('결과보기');
            $('#resultBtn').click(()=>{
               $.getScript(algo,(x,y)=>{
                  $('#result').text('결과 : '
                        +series.arithmetic(
                              $('#start').val(),
                              $('#end').val()
                  ));
               });
            });
         });
      });
      };
   return {init:init};
})();
meta.board=(()=>{
	  var $wrapper,ctx,img,js,css,temp;
	   var init=function(){
	      $wrapper=$('#wrapper');
	      img=$$('i');
	      js=$$('j');
	      ctx=$$('x');
	      temp=js+'/template.js';
	   };
	var detail=x=>{
		init();
		alert('선택한 시퀀스'+x);
		$.getJSON(ctx+'/get/detail/'+x,data=>{
			alert('data 값 ::'+data.test);
			$.getScript(temp,()=>{
				var $container=$('#container');
				$container.empty();
				compUI.div('content').appendTo($container);
				$content=$('#content');
				$('#content').html(bbsUI.detail());
				$('legend').html('게시글보기');
				$('#fname').val(data.bean.title).attr("readonly","true");
				$('#writer').val(data.bean.id).attr("readonly","true");
				$('#message').val(data.bean.content).attr("readonly","true");
				
				$('#confirmBtn').html('수 정').click(e=>{
					e.preventDefault();//이거 막다, 방지하다라는 뜻
					update(x);
				});
				$('#cancelBtn').attr('data-toggle','modal')
				.attr('data-target','#modal')
				.addClass('btn btn-primary')
				.html('삭제하기')
				.click(e=>{
					e.preventDefault();//이거 막다, 방지하다라는 뜻
					deleteArticle(x+","+pass);
				});
				$('#cancelBtn').html('삭 제').click(e=>{
					
					
				});
				$('#bbsBtn').click(e=>{
					alert('게시 클릭');
					meta.board.write();
				});
			});
		});
	};
	var update = x=>{
		alert('수정 클릭');
		detail(x);
		$('legend').html('게시글수정하기');
		
	};
	var deleteArticle = x=>{
		
		alert('삭제 클릭');
		
	};
	var write = ()=>{
		init();
		
		$.getScript(temp,()=>{
			var $container=$('#container');
			$container.empty();
			compUI.div('content').appendTo($container);
			$content=$('#content');
			$('#content').html(bbsUI.detail());
		});
	};
	return {detail : detail};
})();
meta.auth=(function(){
   var $wrapper,ctx,img,js,css,temp;
   var init=function(){
      $wrapper=$('#wrapper');
      img=$$('i');
      js=$$('j');
      temp=js+'/template.js';
      onCreate();
   };
   var onCreate=function(){setContentView();};
   var setContentView=function(){
      $.getScript(temp,(i)=>{
         $wrapper.append(introUI.login(img));
         $('#login_input').after(meta.comp.input(
               {
                  type : 'button',
                  id : 'login_btn',
                  value : '로그인'
               }
            ));
            $('#login_box').append(meta.comp.input(
               {
                  type : 'button',
                  id : 'cancel_btn',
                  value : '취소'
               }
            ));
      });
      
   };
   var joinView=function(){};
   return {
      init : init
   };
})();
meta.navbar=(function(){
   var algo,js,temp,$container;
   var init=function(){
      js=$$('j');
      $container=$('#container');
      algo=js+'/algo.js';
      temp=js+'/template.js';
      onCreate();
   };
   var onCreate=function(){
      $.getScript(temp,() =>{
         $('#navbar').html(introUI.navbar());
         $('#container').html(algoUI.series());
         $('#start_txt').after(compUI.input('start','text'));
         $('#start').attr('placeholder','시작값');
         $('#end_txt').after(compUI.input('end','text'));
         $('#end').attr('placeholder','끝값');
         $('#result').before(compUI.input('resultBtn','button'));
         $('#resultBtn').val('결과보기');
         $('#resultBtn').click(()=>{
            $.getScript(algo,(x1,x2)=>{
               $('#result').text('결과 : '+
                     series.arithmetic(
                           $('#start').val(),
                           $('#end').val()
                     ));
            });
         });
         $('.dropdown-menu a').eq(0).on('click',function(){
            //app.controller.moveTo('member','member_add');
         });
         $('.dropdown-menu a').eq(1).on('click',function(){
            //app.member.list(1);
         });
         $('.dropdown-menu a').eq(2).on('click',function(){
            //app.controller.moveTo('member','member_detail');
         });
         $('.dropdown-menu a').eq(3).on('click',function(){
            //app.controller.deleteTarget('hong','member','member_delete');
         });
         $('.dropdown-menu a').eq(4).on('click',function(){
            //app.controller.moveTo('grade','grade_add');
         });
         $('.dropdown-menu a').eq(5).on('click',function(){
            //app.controller.moveTo('hong','grade','grade_list');
         });
         $('.dropdown-menu a').eq(6).on('click',function(){
            //app.controller.moveTo('grade','grade_detail');
         });
         $('.dropdown-menu a').eq(7).on('click',function(){
            //app.controller.deleteTarget('hong','grade','grade_delete');
         });
         $('.dropdown-menu a').eq(8).on('click',function(){
            //app.controller.moveTo('board','board_write');
         });
         $('.dropdown-menu a').eq(9).on('click',function(){
            //app.controller.moveTo('board','board_list');
         });
         $('.dropdown-menu a').eq(10).on('click',function(){
            //app.controller.moveTo('board','board_detail');
         });
         $('.dropdown-menu a').eq(11).on('click',function(){
            //app.controller.deleteTarget('hong','board','board_delete');
         });
         $('#arithBtn').on('click',function(){
            $container.html(algoUI.series());
            $('#start_txt').after(compUI.input('start','text'));
            $('#start').attr('placeholder','시작값');
            $('#end_txt').after(compUI.input('end','text'));
            $('#end').attr('placeholder','끝값');
            $('#result').before(compUI.input('resultBtn','button'));
            $('#resultBtn').val('결과보기');
            $('h1').html('등차수열의 합');
            $('#resultBtn').click(()=>{
               $.getScript(algo,(x1,x2)=>{
                  $('#result').text('결과 : '+
                        series.arithmetic(
                              $('#start').val(),
                              $('#end').val()
                        ));
               });
            });
         });
         $('#switchBtn').click(()=>{
            $container.html(algoUI.series());
            $('#start_txt').after(compUI.input('start','text'));
            $('#start').attr('placeholder','시작값');
            $('#end_txt').after(compUI.input('end','text'));
            $('#end').attr('placeholder','끝값');
            $('#result').before(compUI.input('resultBtn','button'));
            $('#resultBtn').val('결과보기');
            $('h1').html('스위치수열의 합');
            $('#start').val('1').attr('readonly','true');
            $('#end').val('100').attr('readonly','true');
            $('#resultBtn').click(()=>{
               $.getScript(algo,()=>{
                  $('#result').text('결과값'+series.switchSeries());
               });
            })
         });
         
         
         
         $('#switchBtn').click(()=>{
            $container.html(algoUI.series());
            $('#start_txt').after(compUI.input('start','text'));
            $('#start').attr('placeholder','시작값');
            $('#end_txt').after(compUI.input('end','text'));
            $('#end').attr('placeholder','끝값');
            $('#result').before(compUI.input('resultBtn','button'));
            $('#resultBtn').val('결과보기');
            $('h1').html('스위치수열의 합');
            $('#start').val('1').attr('readonly','true');
            $('#end').val('100').attr('readonly','true');
            $('#resultBtn').click(()=>{
               $.getScript(algo,()=>{
                  $('#result').text('결과값'+series.switchSeries());
               });
            })
         });
         
         $('#geoBtn').click(()=>{
            $container.html(algoUI.series());
            $('#start_txt').after(compUI.input('start','text'));
            $('#start').attr('placeholder','시작값');
            $('#end_txt').after(compUI.input('end','text'));
            $('#end').attr('placeholder','끝값');
            $('#result').before(compUI.input('resultBtn','button'));
            $('#resultBtn').val('결과보기');
            $('h1').html('등비수열의 합');
            $('#start').val('1').attr('readonly','true');
            $('#end').val('100').attr('readonly','true');
            $('#resultBtn').click(()=>{
               $.getScript(algo,()=>{
                  $('#result').text('결과값'+series.diffSeries());
               });
            })
         });
         $('#facBtn').click(()=>{
            $container.html(algoUI.series());
            $('#start_txt').after(compUI.input('start','text'));
            $('#start').attr('placeholder','시작값');
            $('#end_txt').after(compUI.input('end','text'));
            $('#end').attr('placeholder','끝값');
            $('#result').before(compUI.input('resultBtn','button'));
            $('#resultBtn').val('결과보기');
            $('h1').html('팩토리얼 수열의 합');
            $('#start').val('1').attr('readonly','true');
            $('#end').val('100').attr('readonly','true');
            $('#resultBtn').click(()=>{
               $.getScript(algo,()=>{
                  $('#result').text('결과값'+series.factorial());
               });
            })
         });
         $('#fiboBtn').click(()=>{
            $container.html(algoUI.series());
            $('#start_txt').after(compUI.input('start','text'));
            $('#start').attr('placeholder','시작값');
            $('#end_txt').after(compUI.input('end','text'));
            $('#end').attr('placeholder','끝값');
            $('#result').before(compUI.input('resultBtn','button'));
            $('#resultBtn').val('결과보기');
            $('h1').html('피보나치 수열의 합');
            $('#start').val('1').attr('readonly','true');
            $('#end').val('100').attr('readonly','true');
            $('#resultBtn').click(()=>{
               $.getScript(algo,()=>{
                  $('#result').text('결과값'+series.fibonacci());
               });
            })
         });
         //배열 부분
         $('#selBtn').click(()=>{
            var i=0; 
            var sortList=new Array();
            $container.append(compUI.div('content')).css({'width':'100%'});
            $('#content').css({'width':'50%','margin':'0 auto'});
            $('#content').html(algoUI.sort());
            $('#input_label').after(compUI.input('input_box','text'));
            $('#result').before(compUI.input('resultBtn','button'));
            $('#resultBtn').val('다음');
            $('h1').html('선택정렬');
            $('#resultBtn').click(()=>{
               sortList[i]=$('#input_box').val();
               $('#input_box').val('');
               i++
               if(i==5){
                  alert(sortList+'   5개!!');
                  $('#input_box').remove();
                  $('#input_label').remove();
                  $('#resultBtn').val('결과보기');
                  $('#resultBtn').click(()=>{
                     console.log('선택정렬');
                     $.getScript(algo,()=>{
                               $('#resultBtn').remove();
                        $('#result').html('<h3>결과값 : '+sort.selection(sortList)+'</h3>');
                     });
                  });
               }
            });
         });
         $('#bubbleBtn').click(()=>{
            var i=0; 
            var sortList=new Array();
            $container.append(compUI.div('content')).css({'width':'100%'});
            $('#content').css({'width':'50%','margin':'0 auto'});
            $('#content').html(algoUI.sort());
            $('#input_label').after(compUI.input('input_box','text'));
            $('#result').before(compUI.input('resultBtn','button'));
            $('#resultBtn').val('다음');
            $('h1').html('버블 정렬');
            $('#resultBtn').click(()=>{
               sortList[i]=$('#input_box').val();
               $('#input_box').val('');
               i++
               if(i==5){
                  alert(sortList+'   5개!!');
                  $('#input_box').remove();
                  $('#input_label').remove();
                  $('#resultBtn').val('결과보기');
                  $('#resultBtn').click(()=>{
                     console.log('선택정렬');
                     $.getScript(algo,()=>{
                               $('#resultBtn').remove();
                        $('#result').html('<h3>결과값 : '+sort.bubble(sortList)+'</h3>');
                     });
                  });
               }
            });
         });
            
         $('#insertBtn').click(()=>{
            var i=0; 
            var sortList=new Array();
            $container.append(compUI.div('content')).css({'width':'100%'});
            $('#content').css({'width':'50%','margin':'0 auto'});
            $('#content').html(algoUI.sort());
            $('#input_label').after(compUI.input('input_box','text'));
            $('#result').before(compUI.input('resultBtn','button'));
            $('#resultBtn').val('다음');
            $('h1').html('삽입 정렬');
            $('#resultBtn').click(()=>{
               sortList[i]=$('#input_box').val();
               $('#input_box').val('');
               i++
               if(i==5){
                  alert(sortList+'   5개!!');
                  $('#input_box').remove();
                  $('#input_label').remove();
                  $('#resultBtn').val('결과보기');
                  $('#resultBtn').click(()=>{
                     console.log('삽입정렬');
                     $.getScript(algo,()=>{
                               $('#resultBtn').remove();
                        $('#result').html('<h3>결과값 : '+sort.insertion(sortList)+'</h3>');
                     });
                  });
               }
            });
         });
         $('#rankBtn').click(()=>{
            var i=0; 
            var sortList=new Array();
            $container.append(compUI.div('content')).css({'width':'100%'});
            $('#content').css({'width':'50%','margin':'0 auto'});
            $('#content').html(algoUI.sort());
            $('#input_label').after(compUI.input('input_box','text'));
            $('#result').before(compUI.input('resultBtn','button'));
            $('#resultBtn').val('다음');
            $('h1').html('석차구하기');
            $('#resultBtn').click(()=>{
               sortList[i]=$('#input_box').val();
               $('#input_box').val('');
               i++
               if(i==5){
                  alert(sortList+'   5개!!');
                  $('#input_box').remove();
                  $('#input_label').remove();
                  $('#resultBtn').val('결과보기');
                  $('#resultBtn').click(()=>{
                     console.log('삽입정렬');
                     $.getScript(algo,()=>{
                               $('#resultBtn').remove();
                        $('#result').html('<h3>결과값 : '+sort.ranking(sortList)+'</h3>');
                     });
                  });
               }
            });
         });
         
         
         
         
      });
   };

   return {init:init};
})();


meta.session=
   {
      init : (x)=>{
            sessionStorage.setItem('x',x);
            sessionStorage.setItem('j',x+'/resources/js');
            sessionStorage.setItem('c',x+'/resources/css');
            sessionStorage.setItem('i',x+'/resources/img');
              },
      getPath : (x)=>{
            return sessionStorage.getItem(x);
              }
   };
var $$= function(x){return meta.session.getPath(x);};