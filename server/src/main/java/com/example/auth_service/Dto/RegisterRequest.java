package com.example.auth_service.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class RegisterRequest {

    private String username;
    private String password;
    private String email;
    private String role;


}
