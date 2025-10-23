package com.example.auth_service.Response;

import com.example.auth_service.Entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private User user;
    private long expiresIn;
}
