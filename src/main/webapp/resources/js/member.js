/**
 * member javaScript
 */
var app = app || {};
app.path = (function() {// 최상위 브라우저 종료 저장되는곳
	var init = function(ctx) {
		app.session.init(ctx);
		app.member.init();
		onCreate();
	};
	var onCreate = function() {
		alert('onCreate calling...');
		setContentView();
		location.href = ctx() + "/auth/login_view";
		
	};

	var setContentView = function() {
		alert('app.path -> setContentView call');
	};
	var ctx = function() {
		return app.session.getPath('ctx');
	};
	var js = function() {
		return app.session.getPath('js');
	};
	var img = function() {
		return app.session.getPath('img');
	};
	var css = function() {
		return app.session.getPath('css');
	};
	return {
		init : init,
		ctx : ctx,
		js : js,
		img : img,
		css : css,
	};
})();

app.session = (function() { // 세선종료까지 저장
	var init = function(ctx) { // 생성자(초기화)
		sessionStorage.setItem('ctx', ctx);
		sessionStorage.setItem('js', ctx + '/resource/js');
		sessionStorage.setItem('img', ctx + '/resource/img');
		sessionStorage.setItem('css', ctx + '/resource/css');
	};
	var getPath = function(x) {
		return sessionStorage.getItem(x);
	};
	return {
		init : init,
		getPath : getPath
	};
})();

// main MVC 방식,
app.main = (function() {
	var init = function() {
		onCreate();
	};
	var onCreate = function() {
		setContentView();
		$('.list-group').children().addClass("list-group-item");
		$('.list-group li').eq(0).on('click', function() {
			alert('member add click function');
			app.controller.moveTo('member', 'member_add');
		});
		
		$('.list-group li').eq(1).on('click', function() {
			alert('######');
			// location.href=app.path.ctx()+'/member/member_list';
			app.member.list(1);
			// app.controller.list('member','member_list');
		});
		$('.list-group li').eq(2).on('click', function() {
			app.controller.moveTo('member', 'member_detail');
		});
		$('.list-group li').eq(3).on('click', function() {
			app.controller.moveTo('member', 'member_delete');
		});
		$('.list-group li').eq(4).on('click', function() {
			app.controller.moveTo('grade', 'grade_add');
		});
		$('.list-group li').eq(5).on('click', function() {
			app.controller.moveTo('grade', 'grade_list');
		});
		$('.list-group li').eq(6).on('click', function() {
			app.controller.moveTo('grade', 'grade_detail');
		});
		$('.list-group li').eq(7).on('click', function() {
			app.controller.moveTo('grade', 'grade_delete');
		});
		$('.list-group li').eq(8).on('click', function() {
			app.controller.moveTo('board', 'board_write');
		});
		$('.list-group li').eq(9).on('click', function() {
			app.controller.moveTo('board', 'board_list');
		});
		$('.list-group li').eq(10).on('click', function() {
			app.controller.moveTo('board', 'board_detail');
		});
		$('.list-group li').eq(11).on('click', function() {
			app.controller.moveTo('board', 'board_delete');
		});

	};
	var setContentView = function() {
		var $u1 = $("#main_ul_stu");
		var $u2 = $("#main_ul_grade");
		var $u3 = $("#main_ul_board");
		$u1.addClass("list-group");
		$u2.addClass("list-group");
		$u3.addClass("list-group");

	};
	return {
		init : init
	};
})();

app.auth = (function() {
	var init = function() {
		$('#loginBtn').on('click', function() {
			alert('로그인 fx 실행')
			if ($('#input_id').val() === "") {
				alert('ID 를 입력해 주세요');
				return false;
			}
			if ($('#input_pass').val() === "") {
				alert('PASS 를 입력해 주세요');
				return false;
			}
			$('#login_box').attr('action', app.path.ctx() + "/auth/login");
			$('#login_box').attr('method', 'post');
			
			return true;
		});
		
			
	};

	// navbar mvc 방식
	app.navbar = (function() {
		var init = function(ctx) {
			onCreate();
		};
		var onCreate = function() {
			setContentView();
			$('#home').on('click', function() {
				app.controller.moveTo('common', 'main');
			});

			$('#logout').on('click', function() {
				app.controller.moveTo('common', 'login');
			});
			$('.dropdown-menu a').eq(0).on('click', function() {
				alert('0');
				app.controller.moveTo('member', 'member_add');
			});
			$('.dropdown-menu a').eq(1).on('click', function() {
				// app.controller.list('member','member_list');
				app.member.list();
			});
			$('.dropdown-menu a').eq(2).on('click', function() {
				app.controller.moveTo('member', 'member_detail');
			});
			$('.dropdown-menu a').eq(3).on('click', function() {
				app.controller.moveTo('member', 'member_update');
			});
			$('.dropdown-menu a').eq(4).on('click', function() {
				app.controller.moveTo('grade', 'grade_add');
			});
			$('.dropdown-menu a').eq(5).on('click', function() {
				app.controller.moveTo('grade', 'grade_list');
			});
			$('.dropdown-menu a').eq(6).on('click', function() {
				app.controller.moveTo('grade', 'grade_detail');
			});
			$('.dropdown-menu a').eq(7).on('click', function() {
				app.controller.moveTo('grade', 'grade_delete');
			});
			$('.dropdown-menu a').eq(8).on('click', function() {
				app.controller.moveTo('board', 'board_write');
			});
			$('.dropdown-menu a').eq(9).on('click', function() {
				app.controller.moveTo('board', 'board_list');
			});
			$('.dropdown-menu a').eq(10).on('click', function() {
				app.controller.moveTo('board', 'board_detail');
			});
			$('.dropdown-menu a').eq(11).on('click', function() {
				app.controller.moveTo('board', 'board_delete');
			});

		};
		var setContentView = function() {
			var $u1 = $("#navbar_ul_stu");
			var $u2 = $("#navbar_ul_grade");
			var $u3 = $("#navbar_ul_board");
			$u1.addClass("dropdown-menu");
			$u2.addClass("dropdown-menu");
			$u3.addClass("dropdown-menu");

			/*
			 * $('#logout').on('click',function(){
			 * controller.logout('common','home'); });
			 */
		};
		return {
			init : init
		};
	})();
	// member detail
	app.member = (function() {
		var init = function() {
			onCreate();
			add();
		};
		var onCreate = function() {
			setContentView();
			$('.loginBtn').on('click', function() {
				id, phone, email, title;
				sessionStorage.setItem('id', $('#detail_id').text());
				sessionStorage.setItem('phone', $('#detail_phone').text());
				sessionStorage.setItem('emaile', $('#detail_email').text());
				sessionStorage.setItem('title', $('#detail_title').text());
				alert($('#id').text());
				controller.moveTo('member', 'member_update');
				// location.href="<%=application.getContextPath()%>/member/main_view";
			});
			$('#confirm_btn').on('click',function() {
						$('#memberUpdate').attr('action',
								app.path.ctx() + "/student/update");
						$('#memberUpdate').attr('method', 'post');
					});
		};
		
		var setContentView = function() {

		};
		var list = function(pno) {
			location.href = app.path.ctx() + '/member/member_list/' + pno;
		};
		var add = function(){
			$('#join_yes_btn').on('click',function(){
				alert('join button click');
				$('#join_form').attr('action',app.path.ctx()+"/member/add");
				$('#join_form').attr('method','post');
			});
		};
		return {
			init : init,
			list : list,
			add : add
		};
	})();

	app.grade = (function() {
		var init = function() {
			onCreate();
		};
		var onCreate = function() {
			setContentView();
		};
		var setContentView = function() {

		};
		return {
			init : init
		};
	})();

	app.board = (function() {
		var init = function() {
			onCreate();
		};
		var onCreate = function() {
			setContentView();
		};
		var setContentView = function() {

		};
		return {
			init : init
		};
	})();

	app.controller = (function() {
		var init = function() {
			var memberAdd = function() {
				var form = document.getElementById('join_form');
				form.setAttribute('action', app.path.ctx()
						+ '/member/member_add');
				form.setAttribute('method', 'post');
				form.submit();
				return true;
			}
		};
		var moveTo = function(dir, page) {
			alert('member.js update moveTo 진입');
			location.href = app.path.ctx() + "/common/path/" + dir + "/" + page
					+ "/";
		};
		var logout = function(dir, page) {
			// location.href="${ctx}/"+dir+".do?action=logout&page="+page;
		};
		var deleteTarget = function(target) {
			prompt(target + '의 ID?');
		};
		var list = function(dir, page, pageNumber) {
			alert('list function click');
			// location.href=app.path.ctx()+'/'+dir+'/'+page;
		};
		var updateStudent = function() {
			alert('상세에서 수정하기로 가기 123');
			location.href = app.path.ctx() + "/student/update/";

		};
		var deleteStudent = function(deleteid) {
			alert('삭제할 id :: ' + deleteid);
			location.href = app.path.ctx() + "/member/delete/" + deleteid;
		};
		var detailStudent = function(id) {
			alert('조회할 name :: ' + id);
			location.href = app.path.ctx() + "/member/detail/" + id;
		};
		var searchStudent = function() {
			alert('검색버튼클릭');
			var search = $('#search').val();
			location.href = app.path.ctx() + "/member/search/" + search;
			alert(search);
		};
		

		return {
			init : init,
			moveTo : moveTo,
			logout : logout,
			deleteTarget : deleteTarget,
			list : list,
			updateStudent : updateStudent,
			deleteStudent : deleteStudent,
			detailStudent : detailStudent,
			searchStudent : searchStudent,
			
		};
	})();

	var home = (function() {

	})();

	var mainLoad = function() {

	};
	return {
		init : init
	};

})();
