package com.gms.web.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.gms.web.board.Article;
import com.gms.web.command.Command;
import com.gms.web.command.CommandDTO;
import com.gms.web.grade.MajorDTO;
import com.gms.web.grade.SubjectDTO;
import com.gms.web.member.MemberDTO;
import com.gms.web.member.StudentDTO;
@Repository
public interface GradeMapper {
	public int insertMajor(List<MajorDTO> major);
	public void insert(Command cmd);
	public List<Article> selectSome(Command cmd);
	public Article selectOne(Command cmd);
	public String count(Command cmd);
	public void update(Command cmd);
	public void delete(Command cmd);
}
