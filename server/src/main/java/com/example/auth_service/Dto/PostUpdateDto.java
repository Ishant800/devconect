package com.example.auth_service.Dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class PostUpdateDto {
    private Long userId;
    private String content;
    private MultipartFile imageUrl;
}
