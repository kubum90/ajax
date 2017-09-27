package com.gms.web.board;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.gms.web.command.CommandDTO;
import com.gms.web.member.MemberDTO;
import com.gms.web.member.StudentDTO;
@Component
public interface BoardService {
	public void post(Object o);
	public List<?> list(Object o);
	public Object get(Object o);
	public void put(Object o);
	public void delete(Object o);
}
