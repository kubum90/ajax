package com.gms.web.board;


import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import lombok.Data;

@Lazy @Component @Data
public class Article {
	private static final long serialVersionUID = 1L;
	private String id,title,content,regdate;
	private int articleSeq,hitcount;
	
}
