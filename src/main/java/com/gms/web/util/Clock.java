package com.gms.web.util;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.stereotype.Component;
@Component
public class Clock {
	public String getNow(){
		return new SimpleDateFormat("yyyyMMdd a hh:mm:ss").format(new Date());
	} 

}
