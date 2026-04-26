package com.example.auth_service.security;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
public class SecretService {

    @PreAuthorize("hasRole('ADMIN')")
    public String deleteSensitiveData(){
        return "deleted successfully";
    }
}
