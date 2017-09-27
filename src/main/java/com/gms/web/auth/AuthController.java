package com.gms.web.auth;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.gms.web.command.CommandDTO;
import com.gms.web.member.MemberDTO;
import com.gms.web.member.MemberService;

@Controller //annotation
@SessionAttributes("user")
@RequestMapping("/auth")
public class AuthController {
	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
	@Autowired MemberService service;
	@Autowired MemberDTO member;
	@Autowired CommandDTO cmd;
	
	//login page로 보내는 Method
	@RequestMapping("/login_view")
	public String goLogin() {
		logger.info("AuthController 진입   model : {}");

		return "public:common/login.tiles";
	}
	@RequestMapping(value="/login",method=RequestMethod.POST)
	   public String Login(
	         @RequestParam("id") String id,
	         @RequestParam("pass") String pass,    
	         Model model
	         ) {
	         logger.info("#### id :"+id);
	         logger.info("#### pass :"+pass);
	         
	         /*service.login();*/
	         cmd.setSearch(id);
	         cmd.setColumn(pass);
	         
	         Map<String,Object> map = service.login(cmd);
	         //model.addAttribute("result",service.login(cmd).get("result"));
	         if(map.get("result").equals("success")) {
	        	 model.addAttribute("user", map.get("user"));
	         }
	         model.addAttribute("result",map.get("result"));
	      return String.valueOf(map.get("page"));
	   }
}

