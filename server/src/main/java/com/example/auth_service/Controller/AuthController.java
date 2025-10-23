package com.example.auth_service.Controller;

import com.example.auth_service.Dto.AuthRequest;
import com.example.auth_service.Dto.RegisterRequest;
import com.example.auth_service.Dto.UserUpdateDto;
import com.example.auth_service.Entity.User;
import com.example.auth_service.Service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
//@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/auth/signup")
    public ResponseEntity<?> signup(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(service.Register(request));

    }

    @GetMapping("/admin-panel")
    @PreAuthorize("hasRole('USER')")
    public String adminpanel(){
        return "Acess granteed";
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request){
        return ResponseEntity.ok(service.login(request));

    }

    @GetMapping("/validate/{authid}")
    public String validateId(@PathVariable String authid){
        return "User " + authid + "validate sucessfully";
    }

    @GetMapping("/protected/hello")
    public String hellow(){
        return "hello world";
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/public/hello")
    public String publichello()
    {
        return "HELLO WORLD";
    }

    @GetMapping("/auth/api")
    public String privateWelcome(){
        return "Wellcome you are logid in!";
    }

//    @GetMapping("/auth/login")
//    public String loginn(){
//        return "Please log in with your username and password";
//    }

    @PutMapping("/auth/updateprofile")
    public ResponseEntity<User> updateUser(
            @RequestParam("userId") Long userId,
            @RequestParam("username") String username,
            @RequestParam("bio") String bio,
            @RequestParam("skills") String skills,
            @RequestParam(value = "profileImage",required = false) MultipartFile profileImage
    ) throws IOException{
        UserUpdateDto dto = new UserUpdateDto();
        dto.setBio(bio);
        dto.setUserId(userId);
        dto.setSkills(skills);
        dto.setUsername(username);
        return ResponseEntity.ok(service.updateUser(dto,profileImage));
    }

    @GetMapping("/auth/{id}")
    public ResponseEntity<User> getuser(@PathVariable Long id){
        return ResponseEntity.ok(service.getUser(id));
    }

    @PostMapping("/auth/getOtp")
    public ResponseEntity<?> generateotp(@RequestBody String email){
        return ResponseEntity.ok(service.getOtp(email));
    }


}