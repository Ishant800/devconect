package com.example.auth_service.Dto.Project;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDto {

    private Long projectId;
    private String title;
    private String description;
    private String tags;
    private String techStack;
    private String link;
    private String projectImage;

    private int viewCount;
}
