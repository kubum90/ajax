package com.gms.web.grade;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;


@Data @Lazy @Component
public class MajorDTO {
	
		private String majorId, title, id, subjId;

		@Override
		public String toString() {
			return "MajorBean [majorId=" + majorId + ", title=" + title + ", id=" + id + ", subjId=" + subjId + "]";
		}

	}


