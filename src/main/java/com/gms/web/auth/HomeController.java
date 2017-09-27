package com.gms.web.auth;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.gms.web.complex.PathFactory;
import com.sun.glass.ui.Application;

/**
 * Handles requests for the application home page.
 */
@Controller
@SessionAttributes("path")
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@RequestMapping("/")
	public String home(Model model) {
		logger.info("Welcome home! The client locale is {}.");
			
		String pattern = "yyyy년-MM월-dd일 hh시 mm분 ss초";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		String date = simpleDateFormat.format(new Date());
		model.addAttribute("path",PathFactory.create());
		
		
		return "index";
	}
	
}
