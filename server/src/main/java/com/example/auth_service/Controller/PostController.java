package com.example.auth_service.Controller;

import com.example.auth_service.Dto.PostUpdateDto;
import com.example.auth_service.Entity.Post;

import com.example.auth_service.Service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin("*")
public class PostController {

    @Autowired
    private PostService service;

    @PostMapping("/public/addpost")
    public ResponseEntity<Post> createPost(@RequestParam Long userId,
                                           @RequestParam("content") String content,
                                           @RequestParam(value = "imageUrl") MultipartFile postImage) throws IOException {

        PostUpdateDto dto = new PostUpdateDto();
        dto.setContent(content);
        dto.setUserId(userId);

        return ResponseEntity.ok(service.createPost(dto,postImage));
    }

    @GetMapping("/public/posts")
    public ResponseEntity<List<Post>> getallpost(){
        return ResponseEntity.ok(service.getAllpost());
    }
}
