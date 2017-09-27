package com.gms.web.member;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.gms.web.command.CommandDTO;
import com.gms.web.complex.PathFactory;
import com.gms.web.grade.MajorDTO;
import com.gms.web.proxy.BlockHandler;
import com.gms.web.proxy.PageHandler;
import com.gms.web.proxy.PageProxy;


@Controller
@SessionAttributes("student")
@RequestMapping({"/member","/student"})
public class MemberController {
	private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
	@Autowired MemberService service;
	@Autowired CommandDTO cmd;
	@Autowired PageProxy pxy;
	@Autowired MemberDTO member;
	@Autowired MajorDTO major;
	
	@RequestMapping(value="/add",method=RequestMethod.POST)
	public String addStudent(@ModelAttribute MemberDTO member,@RequestParam("subject") List<String> list) {
		
		logger.info("등록 ID :: {}",member.getId());
		logger.info("등록 이름 :: {}",member.getName());
		logger.info("등록 비번 :: {}",member.getPassword());
		System.out.println("등록 과목 :: "+list);
		logger.info("등록 과목 :: {}",list);
		
		Map<String, Object>paramMap = new HashMap<>();
		paramMap.put("member", member);
		List<MajorDTO> paramList = new ArrayList<>();
		MajorDTO mj = null;
		for(String m:list) {
			int random = (int) (Math.random()*9999)+1000;
			mj=new MajorDTO();
			mj.setId(member.getId());
			mj.setMajorId(String.valueOf(random));
			mj.setSubjId(m);
			mj.setTitle(m);
			paramList.add(mj);
		}
		
		paramMap.put("list", paramList);
		service.add(paramMap);
		return "redirect:/member/member_list/1";		
	}
	
	@RequestMapping("/memeber_add")
	public String MemberAdd() {
		logger.info("memberAdd ~ ");
		return "auth:member/member_add.tiles";
	}
	
	@RequestMapping("/member_list/{pno}")
	@SuppressWarnings("unchecked")
	public String memberList(Model model,@PathVariable int pno) {
		logger.info("@ctrl : memberList {}","entered");
		pxy.setPageSize(5);
		pxy.setBlockSize(5);
		pxy.setPageNumber(pno);
		System.out.println("페이지넘버 : "+pno);
		int count = Integer.parseInt(service.count());
		pxy.setTheNumberOfRows(count);
		int[] result = new int[6];
		int theNumberOfPages=0,
				startPage=0,
				endPage=0;
		theNumberOfPages = (pxy.getTheNumberOfRows() % pxy.getPageSize())==0 ?
				pxy.getTheNumberOfRows() / pxy.getPageSize() :
					pxy.getTheNumberOfRows() / pxy.getPageSize() +1;
		startPage= pxy.getPageNumber()-((pxy.getPageNumber()-1) % pxy.getBlockSize());
		endPage=(startPage+pxy.getBlockSize()-1 <= theNumberOfPages) ?
				startPage + pxy.getBlockSize() -1 : theNumberOfPages;
		result[0]=pxy.getPageNumber();
		result[1]=theNumberOfPages;
		result[2]=startPage;
		result[3]=endPage;
		result[4]=(startPage-(theNumberOfPages/pxy.getBlockSize())>0) ? 1:0;
		result[5]=startPage + pxy.getBlockSize();
		if(pxy.getPageNumber() <= pxy.getTheNumberOfRows() / pxy.getPageSize() + 1) {
			if(pxy.getPageNumber()==1) {
				cmd.setStartRow("1");
				cmd.setEndRow(String.valueOf(pxy.getPageSize()));
			}else {
				cmd.setStartRow(String.valueOf((pxy.getPageNumber() - 1) * pxy.getPageSize() + 1));
				cmd.setEndRow(String.valueOf(pxy.getPageNumber()*pxy.getPageSize()));
			}
		}
		
		List<StudentDTO> list = (List<StudentDTO>) service.list(cmd);
		pxy.execute(model, result, list);
		model.addAttribute("count",count);
	/*	String count2=service.count();
		model.addAttribute("count", count2);*/
		
		return "auth:member/member_list.tiles";
	}

	@RequestMapping("/delete/{deleteid}")
	public String deleteMember(@PathVariable String deleteid) {
		logger.info("delete student");
		cmd.setSearch(deleteid);
		service.remove(cmd);
		return "redirect:/member/member_list/1";
	}
	
	@RequestMapping("/search/{search}")
	public String search(Model model,@PathVariable String search) {
		cmd.setSearch(search);
		List<?> searchList=service.findByName(cmd);
		model.addAttribute("list",searchList);
	
		return "auth:member/member_list.tiles";
	}
	@RequestMapping("/detail/{id}")
	public String detail(Model model,@PathVariable String id) {
		logger.info("detail student 진입");
		cmd.setSearch(id);
		System.out.println(" 넘어온아이디 :: "+cmd.getSearch());
		model.addAttribute("student",service.findById(cmd));
		return "auth:member/member_detail.tiles";
	}
	@RequestMapping(value="/update",method=RequestMethod.POST)
	public String updateStudent(@ModelAttribute MemberDTO stu) {
		logger.info("member update{}","진입~");
		service.modify(stu);
		//redirect:/member/member_list/1
		return "redirect:/member/detail/"+stu.getId();
	}
}
