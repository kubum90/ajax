package com.gms.web.board;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.gms.web.command.Command;
import com.gms.web.command.ResultMap;
import com.gms.web.mapper.BoardMapper;
import com.gms.web.mapper.GradeMapper;
import com.gms.web.service.IGetService;
import com.gms.web.service.IListService;


@RestController
public class BoardController {
	private static final Logger logger = LoggerFactory.getLogger(BoardController.class);
	
	@Autowired BoardMapper boardMapper;
	@Autowired GradeMapper gradeMapper;
	@Autowired Command cmd;

	public @ResponseBody Map<?, ?> post(){
		return null;
	}
	
	@RequestMapping("/list/{cat}")
	public @ResponseBody Map<?, ?> list(@PathVariable String cat) {
		logger.info("Board ContList{} ","진입");
		Map<String, Object>map = new HashMap<>();
		System.out.println("board/list 에 들어옴 !!");
		IListService listService=null;
		IGetService countService =null;
		
		System.out.println("cat::"+cat);
		switch (cat) {
		case "articles":
			cmd= null;
			System.out.println("케이스 보드 진입");
			listService = (x)-> {
					return boardMapper.selectList(cmd);
			};
			countService=(x)->{
				return boardMapper.count(cmd);
			};
			System.out.println(listService);
			ResultMap r=(ResultMap) countService.execute(cmd);
			map.put("result", "SUCCESS!!");
			map.put("total", r);
			map.put("msg", "ㅎ아런이라");
			map.put("list", listService.execute(cmd));
			break;
		case "grade":
			cmd= null;
			/*listService = (x)-> {
					return gradeMapper.selectSome(cmd);
			};
			map.put("list", listService.execute(cmd));*/
			break;
		default:
			break;
		}
		return map;
	}
	@RequestMapping({"/get/{cate}/{id}"})
	public @ResponseBody Map<?, ?> get(@PathVariable String cate,@PathVariable String id){
		 logger.info("detail get{} ","진입");
	      System.out.println("넘어온 Seq"+id);
	      IGetService detailService=null;
	      cmd=new Command();
	      Map<String,Object>map =new HashMap<>();
	      Article bean=null;
	      switch (cate) {
	   case "detail":
	      System.out.println("detail 케이스 진입");
	      map.put("test", "데이터 넘어감");
		   cmd.setSearch(id);
	      detailService=(x)-> {
	         return boardMapper.selectOne(cmd);
	      };
	      bean = (Article) detailService.execute(cmd);
	      System.out.println("####"+bean.getContent());
	      break;

	   default:
	      break;
	   }
	      map.put("bean", bean);
	      return map;
	}
	public @ResponseBody Map<?, ?> put(){
		return null;
	}
	public @ResponseBody Map<?, ?> delete(){
		return null;
	}
}

