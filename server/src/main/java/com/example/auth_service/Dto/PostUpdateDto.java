package com.example.auth_service.Dto;

import lombok.Data;

@Data
public class PostUpdateDto {
    private Long userId;
    private String content;
    private String imageurl;
}
