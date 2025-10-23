package com.example.auth_service.Cloudinary;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/public/uplaod")
public class UploadController {
    @Autowired
    private CloudinaryService cloudinaryService;


    @PostMapping
    public ResponseEntity<Map> upload(@RequestParam("file")MultipartFile file) throws IOException{
        Map uploadResult = cloudinaryService.uplaodFile(file);
        return ResponseEntity.ok(uploadResult);
    }

}
