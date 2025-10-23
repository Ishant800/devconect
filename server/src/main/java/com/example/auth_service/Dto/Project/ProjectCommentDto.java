package com.example.auth_service.Dto.Project;

import lombok.Data;

@Data
public class ProjectCommentDto {
    private Long userId;
    private Long projectId;
    private String text;
}
