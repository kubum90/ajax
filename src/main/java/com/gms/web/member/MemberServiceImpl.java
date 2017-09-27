package com.gms.web.member;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gms.web.command.CommandDTO;
import com.gms.web.grade.MajorDTO;
import com.gms.web.grade.SubjectDTO;
import com.gms.web.mapper.GradeMapper;
import com.gms.web.mapper.MemberMapper;
import com.gms.web.member.MemberDTO;
import com.gms.web.member.StudentDTO;

import freemarker.log.Logger;
@Service
public class MemberServiceImpl implements MemberService{
	@Autowired MemberMapper mapper;
	@Autowired MajorDTO major;
	@Autowired GradeMapper gMapper;
	@Autowired CommandDTO cmd;
	@Autowired MemberDTO member;
	public static MemberServiceImpl getInstance() {
		return new MemberServiceImpl();
	}
	private MemberServiceImpl(){}
	
	@Override @Transactional
	public int add(Map<?,?> map) {
		
		System.out.println("member service 진입");
		member=(MemberDTO) map.get("member");
		@SuppressWarnings("unchecked")
		List<MajorDTO> list = (List<MajorDTO>) map.get("list");
		System.out.println("ID ####" +member.getId());
		System.out.println("LIST ####" + list);
		mapper.insert(member);
		gMapper.insertMajor(list);
		int rs=0;
		return rs;
	}
	@Override
	public List<?> list(CommandDTO cmd) {
		
		return mapper.selectAll(cmd);
	}
	@Override
	public List<?> findByName(CommandDTO cmd) {
		System.out.println("findByName("+cmd.getSearch()+")");
		return mapper.selectByName(cmd);
	}

	@Override
	public StudentDTO findById(CommandDTO cmd) {
		System.out.println("findByID("+cmd.getSearch()+")");
		return mapper.selectById(cmd);
	}

	@Override
	public String count() {
		String count = mapper.count();
		System.out.println("카운트 -> serviceImpl 통과" + count);
		return count;
	}

	@Override
	public int modify(MemberDTO bean) {		
		return mapper.update(bean);
	}

	@Override
	public int remove(CommandDTO cmd) {
		System.out.println("MemberServiceImpl - removeID :: "+cmd.getSearch());
		
		return  mapper.delete(cmd);
	}
	@Override
	   public Map<String,Object> login(CommandDTO bean) {
	      Map<String,Object> map=new HashMap<>();
	      /*CommandDTO cmd=new CommandDTO();*/
	      System.out.println("MemberServiceImple에 들어온 Search한 ID :"+bean.getSearch());
	      member=mapper.login(bean);
	      /*cmd.setSearch(bean.getSearch());*/
	      String result ="";
	      String page="";
	      
	      if(member!=null){
	         if(bean.getColumn().equals(member.getPassword())) {
	        	 result="success";
	        	 page="auth:common/main.tiles";
	         }else {
	            result="비밀번호가 틀렸습니다";
	            page="public:common/login.tiles";
	         }
	      }else {
	         result="아이디가 없습니다";
	         page="public:common/login.tiles";
	      }
	      
	      map.put("result", result);
	      map.put("page", page);
	      map.put("user", member);
	      return map;
	      
	   }
}
