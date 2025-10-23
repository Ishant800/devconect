package com.example.auth_service.Service;

import com.example.auth_service.Cloudinary.CloudinaryService;
import com.example.auth_service.Dto.AuthRequest;
import com.example.auth_service.Dto.RegisterRequest;
import com.example.auth_service.Dto.SignupRequest;
import com.example.auth_service.Dto.UserUpdateDto;
import com.example.auth_service.Email.Emailsender;
import com.example.auth_service.Entity.User;
import com.example.auth_service.Jwt.JwtUtils;
import com.example.auth_service.Otp.Otpgenerate;
import com.example.auth_service.Repository.AuthRepo;
import com.example.auth_service.Response.AuthResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class AuthService {
    @Autowired
    private AuthRepo authRepo;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private Emailsender emailsender;

    @Autowired
    private Otpgenerate otpgenerate;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public User signup(SignupRequest request){
        User auth = new User();
        auth.setEmail(request.getEmail());
        auth.setPassword(encoder.encode(request.getPassword()));
        auth.setRole("USER");

        User saveddata = authRepo.save(auth);

        SignupRequest userservice = new SignupRequest();
        userservice.setAuthId(saveddata.getId());
        userservice.setUsername(request.getUsername());
        userservice.setBio(request.getBio());
        userservice.setProfilePic(request.getProfilePic());

        String url = "http://localhost:8082/api/create";
        try {
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
            System.out.println("User service response: " + response.getStatusCode());
        } catch (Exception e) {
            System.out.println("Error calling user service: " + e.getMessage());
        }

        return saveddata;
    }

    public AuthResponse Register(RegisterRequest req){
        if(authRepo.existsByUsername(req.getUsername())  ){
            throw new RuntimeException("username already taken");
        }

        if(authRepo.existsByEmail(req.getEmail())){
            throw new RuntimeException("email already exists");
        }


        //save user in auth db
        User auth = new User();
        auth.setEmail(req.getEmail());
        auth.setPassword(encoder.encode(req.getPassword()));
        auth.setRole("ROLE_USER");
        auth.setUsername(req.getUsername());


        User saveddata = authRepo.save(auth);


        //notify the User service
//        SignupRequest request = new SignupRequest();
//        request.setAuthId(saveddata.getId());
//        request.setUsername(request.getUsername());
//        request.setBio(request.getBio());
//        request.setProfilePic(request.getProfilePic());

//        String url = "http://localhost:8082/api/create";
//        try {
//            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
//            System.out.println("User service response: " + response.getStatusCode());
//        } catch (Exception e) {
//            System.out.println("Error calling user service: " + e.getMessage());
//        }


        //generate acess token
        String acessToken = jwtUtils.generateAccessToken(
                saveddata.getId().toString(),
                saveddata.getUsername(),
                saveddata.getEmail(),
                saveddata.getRole()
        );

        return new AuthResponse(acessToken,"Bearer",saveddata, jwtUtils.getJwtExpirationMs());

    }



    public AuthResponse login(AuthRequest request){
        User user = authRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email"));


        if(!encoder.matches(request.getPassword(), user.getPassword()))
            throw new RuntimeException("invalid password");

        String acess = jwtUtils.generateAccessToken(user.getId().toString(),user.getUsername(), user.getEmail(), user.getRole());

//        long expiresIn = System.currentTimeMillis() + jwtUtils.getJwtExpirationMs();

        System.out.println(acess);

    return new AuthResponse(acess,"Bearer",user, jwtUtils.getJwtExpirationMs());
    }


    public User updateUser(UserUpdateDto dto, MultipartFile profileImage) throws IOException {
        User user = authRepo.findById(dto.getUserId()).orElseThrow(()-> new IllegalArgumentException("usern not found"));
        user.setBio(dto.getBio());
        user.setSkills(dto.getSkills());
        user.setUsername(dto.getUsername());


        if(profileImage != null && !profileImage.isEmpty()){
            Map uplaodResult = cloudinaryService.uplaodFile(profileImage);
            String imageUrl = uplaodResult.get("secure_url").toString();
            user.setProfileImage(imageUrl);
        }

       return authRepo.save(user);
    }


    public User getUser(Long id){
       User user = authRepo.findById(id).orElseThrow(()-> new RuntimeException("user  not found"));
        return user;
    }

    public String getOtp(String email) {
        User user = authRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("email not found"));
        String otp = otpgenerate.generateSixDigitOtp();
        emailsender.sendOtp(email, otp);
        return "otp send sucessfully to your email";
    }

}
