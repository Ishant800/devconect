package com.example.auth_service.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/security")
public class SecurityController {
    @Autowired
    private SecretService service;

    @GetMapping("/check")
    public String check(){
        return service.deleteSensitiveData();
    }
}
