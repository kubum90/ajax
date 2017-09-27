-- ************************
-- 2017.09.04
-- [1]MAJOR_TAB
-- [2]SUBJECT_TAB
-- [3]MEMBER_TAB
-- [4]PROF_TAB
-- [5]STUDENT_TAB
-- [6]GRADE_TAB
-- [7]BOARD_TAB
-- ************************
DROP SEQUENCE article_seq;
CREATE SEQUENCE seq
 START WITH     2000
 INCREMENT BY   1
 NOCACHE
 NOCYCLE;
-- ************************
-- [1]MAJOR_TAB
-- 2017.08.02
-- article_seq,id,title,
-- content,hitcount,regdate
-- ************************
-- DDL
select * from major;
alter table major add subj_id nvarchar(10);
CREATE TABLE MAJOR(
	major_id VARCHAR(10),
	title VARCHAR(10),
	PRIMARY KEY(major_id)
);
-- DML
INSERT INTO Major(major_id,title)
VALUES('','');
-- ************************
-- [2]SUBJECT_TAB
-- 2017.08.02
-- subj_id,title,major_id
-- ************************
-- DDL
CREATE TABLE Subject(
	subj_id VARCHAR(10),
	title VARCHAR(10),
	major_id VARCHAR(10),
	PRIMARY KEY(subj_id)
);
-- DML
INSERT INTO Subject(subj_id,title,major_id)
VALUES('','','');
-- ********************
-- [3]MEMBER_TAB
-- 2017.08.02
-- member_id,name,password,
-- ssn,regdate,major_id,
-- phone,email,profile
-- *******************
-- DDL

select * from table;

CREATE TABLE Member(
	member_id VARCHAR(10),
	name VARCHAR(10),
	password VARCHAR(10),
	ssn VARCHAR(15),
	regdate DATETIME DEFAULT CURRENT_TIMESTAMP,
	phone VARCHAR(20),
	email VARCHAR(20),
	profile VARCHAR(20),
	PRIMARY KEY(member_id)	
);

DROP DATABASE Member;
select DATABASE member;
-- DML
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile)
VALUES('mankiew','맨큐','1','701201-123456',now(),'010-1234-5678','mankiew@test.com','mankiew.jpg');
select * from member;
SELECT 
member_id,name,password,ssn,major_id,
phone,email,profile,regdate 
FROM Member;

SELECT COUNT(*) AS count FROM Member;
UPDATE Member SET password='2' WHERE member_id='hong';
DELETE FROM Member WHERE member_id='choi';
-- ************************
-- [4]PROF_TAB
-- 2017.08.02
-- member_id,salary
-- ************************
-- DDL
CREATE TABLE Prof(
	member_id VARCHAR(10),
	salary VARCHAR(10),
	PRIMARY KEY(member_id)
);
-- DML
INSERT INTO Prof(member_id,salary)
VALUES('gogh','5000');
-- ************************
-- [5]STUDENT_TAB
-- 2017.08.02
-- member_id,stu_no
-- ************************
-- DDL
CREATE TABLE Student(
	member_id NVARCHAR(10),
	stu_no NVARCHAR(8),
	PRIMARY KEY(member_id),
	FOREIGN KEY(member_id) REFERENCES Member(member_id)
		ON DELETE CASCADE
);
DROP TABLE Student;
-- DML


-- ************************
-- [6]GRADE_TAB
-- 2017.08.02
-- grade_seq,score,exam_date,
-- subj_id,member_id
-- ************************
-- DDL
CREATE TABLE Grade(
	grade_seq INT NOT NULL AUTO_INCREMENT,
	score VARCHAR(3),
	exam_date VARCHAR(12),
	subj_id VARCHAR(10),
	member_id VARCHAR(10),
	PRIMARY KEY(grade_seq)	
);
ALTER TABLE Grade
RENAME COLUMN id TO member_id;
DROP TABLE Grade;
-- DML
SELECT * FROM Grade;
INSERT INTO Grade(grade_seq,score,exam_date,subj_id,member_id)
VALUES(seq.nextval,'90','2017-03','java','hong');
-- member_id 를 입력하면 평균점수를 반환하는 sql
select * from member;
select avg(score)
from (select distinct
	m.member_id id ,m.name name ,mj.title major,
	g.SCORE score,sj.title subject,g.exam_date
from member m,student s,grade g,subject sj,major mj
where 
    m.member_id=s.member_id 
    and m.member_id=g.member_id
    and sj.MAJOR_ID=mj.MAJOR_ID
    and sj.subj_id=g.subj_id) t
where t.id='hong';

select avg(score)
from (select 
		m.member_id id ,m.name name ,
		g.score score,g.exam_date exam_date
	 from Grade g 
		inner join Subject s on g.subj_id=s.subj_id
		inner join Member m on m.member_id=g.member_id
) t
where t.id='hong';

-- ************************
-- [7]BOARD_TAB
-- 2017.08.02
-- article_seq,id,title,
-- content,hitcount,regdate
-- ************************
-- DDL
CREATE TABLE Board(
	article_seq INT NOT NULL AUTO_INCREMENT,
	id VARCHAR(10),
	title VARCHAR(20),
	content VARCHAR(100),
	hitcount INT,
	regdate DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(article_seq)
);
DROP TABLE Board;
-- DML
INSERT INTO Board(article_seq,id,title,content,hitcount,regdate)
VALUES(seq.nextval,'kim','대중을 있는',
	'주는 얼마나 크고 품에 대중을 있는',0,SYSDATE);
SELECT * FROM Board;
SELECT COUNT(*) FROM BOARD;
SELECT * FROM Board WHERE id='hong';
UPDATE Board SET title='bonjour',content='comment cava' WHERE article_seq=1000;
SELECT DISTINCT member_id 
FROM Board 
WHERE member_id LIKE '_i%';

SELECT DISTINCT ssn,name  
FROM Member m, Board b
WHERE m.id=b.id AND ROWNUM <= 10;

SELECT ssn,name 
FROM Member m, Board b,Grade g
WHERE m.id=b.id OR m.id=g.id;

-- ************************
-- [8]TEST_TAB
-- 2017.08.03
-- article_seq,id,title,
-- content,hitcount,regdate
-- ************************

create table male(
	couple_id number primary key,
	name varchar2(10)
);
create table female(
	couple_id number primary key,
	name varchar2(10)
);

select * from member where member_id like 'hong';
select * from major;
select * from member;
select rownum num,t.*
from (select * 
from member m join major j
on m.member_id = j.member_id) t
;
select * from student;
drop table student;

create view student (num,id,name,ssn,regdate,phone,email,title)
as
select rownum num, t.*
from(select 
		a.member_id id, a.name, rpad(substr(a.ssn,1,8),14,'*') ssn, 
		to_char(a.regdate,'yyyy-MM-dd') regdate, a.phone, a.email,
		listagg(s.title,',') within group(order by s.title) title
	from member a
		left join major m on a.member_id like m.member_id
		left join subject s on m.subj_id like s.subj_id
		group by a.member_id, a.name, a.ssn, a.regdate, a.phone, a.email
		order by regdate 
	)t
order by rownum desc;


select 
a.member_id, a.name, a.ssn, a.regdate, a.phone, a.email,
	listagg(s.title,',') within group(order by s.title) title
from member a
left join major m on a.member_id like m.member_id
left join subject s on m.subj_id like s.subj_id
group by a.member_id, a.name, a.ssn, a.regdate, a.phone, a.email;

select listagg(title,',') within group(order by title) title
from subject;



select * from student
where rownum <= 5;
;

select  t.*
from (select * from student
where num >((select count(*) from student) -5)) t
;


SELECT t2.*
FROM (SELECT ROWNUM seq,t.*
FROM (SELECT *FROM student ORDER BY num DESC) t) t2
WHERE t2.seq BETWEEN 6 AND 10;

SELECT t2.* 
FROM (SELECT ROWNUM seq,t.* 
   	  FROM (SELECT * 
   	  			FROM student 
   	  			ORDER BY num DESC) t) t2
WHERE t2.seq BETWEEN 1 AND 5;




select * from student;



select rownum, s.*
from student s
where rownum between 6 and 10;

select t.*
from (select rownum rnum, s.* 
		from student s)t
where t.rnum between 1 and 5;

SELECT t2.*
FROM (SELECT ROWNUM seq,t.*
  FROM (SELECT *
  FROM student
  WHERE name like '%홍%'
  ORDER BY num DESC) t) t2
WHERE t2.seq BETWEEN 1 AND 5;







select * from member a
left join major m on a.member_id like m.member_id
left join subject s on m.subj_id like s.subj_id
group by a.member_id, a.name, a.ssn, a.regdate, a.email
order by regdate;



create view student (id,name,ssn,regdate,phone,email,pass,subjects)
as
(
select
a.member_id id,
a.name name,
rpad(substring(a.ssn,1,8),14,'*') ssn,
date_format(a.regdate,'%Y-%m-%d') regdate,
a.phone phone,
a.email email,
a.password pass,
group_concat(s.title) subjects
from member a
left join major m
on a.member_id like m.member_id
left join subject s
on m.subj_id like s.subj_id
group by
a.member_id,a.name,a.ssn,
a.regdate,a.phone,a.email
order by regdate
);

select @RNUM L= @RNUM + 1 as no,t.*
from student t,(select @RNUM := 0) b;

INSERT INTO Prof(member_id,salary)
VALUES('iphone','4000');
INSERT INTO Grade(grade_seq,score,exam_date,subj_id,member_id)
VALUES(seq.nextval,'90','2017-03','java','kang');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('백두산','홍백두','1','701201-123456',now(),'010-1234-5678','hong@test.com','hong.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('chang','송창완','1','901201-123456',now(),'010-1234-5678','chang@test.com','chang.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('kang','강정우','1','681201-123456',now(),'010-1234-5678','kang@test.com','kang.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('kim','김철수','1','691201-123456',now(),'010-1234-5678','kim@test.com','kim.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('yoo','유미라','1','481201-123456',now(),'010-1234-5678','yoo@test.com','yoo@test.com.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('yoon','윤미래','1','801201-123456',now(),'010-1234-5678','yoon@test.com','yoon.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('moon','문정아','1','901201-123456',now(),'010-1234-5678','moon@test.com','moon.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('park','박덕복','1','911201-123456',now(),'010-1234-5678','park@test.com','park.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('pig','홍돼지','1','911201-123456',now(),'010-1234-5678','pig@test.com','pig.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('horse','홍말복','1','931201-123456',now(),'010-1234-5678','horse@test.com','horse.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('gkrryrk','김학교','1','951201-123456',now(),'010-1234-5678','gkrryrk@test.com','gkrryrk.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('snake','선뱀휘','1','941201-123456',now(),'010-1234-5678','snake@test.com','snake.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('choice','장선택','1','971201-123456',now(),'010-1234-5678','choice@test.com','choice.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('better','갈비찜','1','961201-123456',now(),'010-1234-5678','better@test.com','better.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('wprkffi','신지천','1','901201-123456',now(),'010-1234-5678','wprkffi@test.com','hong.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('song','송중기','1','781201-123456',now(),'010-1234-5678','song@test.com','song.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('adult','유레아','1','791201-123456',now(),'010-1234-5678','adult@test.com','hong.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('child','어린이','1','701201-123456',now(),'010-1234-5678','child@test.com','hong.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('back','백두산','1','801201-123456',now(),'010-1234-5678','back@test.com','back.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('jo','그림조','1','831201-123456',now(),'010-1234-5678','jo@test.com','jo.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('jin','진드기','1','861201-123456',now(),'010-1234-5678','jin@test.com','jin.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('bob','밥노랑','1','881201-123456',now(),'010-1234-5678','bob@test.com','bob.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('steve','스티브','1','871201-123456',now(),'010-1234-5678','steve@test.com','steve');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('jack6','잭식스','1','891201-123456',now(),'010-1234-5678','jack6@test.com','jack6');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('alisa','알리사','1','941201-123456',now(),'010-1234-5678','alisa@test.com','alisa.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('miguel','미구엘','1','941201-123456',now(),'010-1234-5678','miguel@test.com','miguel.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('heiha','헤이치','1','911201-123456',now(),'010-1234-5678','kazuya@test.com','kazuya.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('kazuya','카즈야','1','951201-123456',now(),'010-1234-5678','kazuya@test.com','hong.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('kazumi','카즈미','1','921201-123456',now(),'010-1234-5678','kazumi@test.com','kazuya.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('dragon','드래곤','1','961201-123456',now(),'010-1234-5678','dragon@test.com','dragon.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('king','호랑이','1','901201-123456',now(),'010-1234-5678','king@test.com','king.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('armor','검은호','1','891201-123456',now(),'010-1234-5678','armor@test.com','hong.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('trash','스레기','1','791201-123456',now(),'010-1234-5678','trash@test.com','armor');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('threash','스레쉬','1','781201-123456',now(),'010-1234-5678','threash@test.com','threash.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('min','민효린','1','781201-123456',now(),'010-1234-5678','min@test.com','hong.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('hwarang','화랑','1','881201-123456',now(),'010-1234-5678','hwarang@test.com','hong.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('reo','레오','1','851201-123456',now(),'010-1234-5678','reo@test.com','reo.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('neo','네오','1','851201-123456',now(),'010-1234-5678','neo@test.com','neo.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('cgv','영화관','1','871201-123456',now(),'010-1234-5678','cgv@test.com','cgv.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('lotte','롯데','1','891201-123456',now(),'010-1234-5678','lotte@test.com','hong.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('samsung','갤팔꾼','1','891201-123456',now(),'010-1234-5678','samsung@test.com','samsung.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('galaxy','갤럭이','1','901201-123456',now(),'010-1234-5678','galaxy@test.com','hong.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('iphone','폰팔이','1','931201-123456',now(),'010-1234-5678','iphone@test.com','hong.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('app','앱등이','1','931201-123456',now(),'010-1234-5678','app@test.com','hong.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('parlia','팔리아','1','921201-123456',now(),'010-1234-5678','parlia@test.com','hong.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('ment','멘트','1','914201-123456',now(),'010-1234-5678','ment@test.com','hong.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('man','남자','1','931201-123456',now(),'010-1234-5678','man@test.com','hong.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('sole','김깡','1','971201-123456',now(),'010-1234-5678','sole@test.com','hong.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('mad','박매드','1','971201-123456',now(),'010-1234-5678','mad@test.com','hong.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('madking','장광남','1','931201-123456',now(),'010-1234-5678','madking@test.com','hong.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('kwang','광저우','1','921201-123456',now(),'010-1234-5678','kwang@test.com','hong.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('coffe','커피만','1','921201-123456',now(),'010-1234-5678','coffe@test.com','coffe.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('maxim','하맥심','1','921201-123456',now(),'010-1234-5678','maxim@test.com','maxim.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('militar','군인','1','921201-123456',now(),'010-1234-5678','militar@test.com','militar.jpg');
INSERT INTO Member(member_id,name,password,ssn,regdate,phone,email,profile) VALUES('paris','파리스','1','921201-123456',now(),'010-1234-5678','paris@test.com','paris.jpg');







