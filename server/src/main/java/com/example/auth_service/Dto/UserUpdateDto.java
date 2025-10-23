package com.example.auth_service.Dto;


import lombok.Data;

@Data
public class UserUpdateDto {
    private Long userId;
    private String username;
    private String bio;
    private String profileImage;
    private String skills;
}
