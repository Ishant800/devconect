package com.example.auth_service.Controller;

import com.example.auth_service.Dto.PostUpdateDto;
import com.example.auth_service.Entity.Post;

import com.example.auth_service.Repository.PostRepo;
import com.example.auth_service.Service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
public class PostController {


    private final PostRepo postRepo;


    private final PostService service;


    @PostMapping("/public/addpost")
    public ResponseEntity<Post> createPost(@ModelAttribute PostUpdateDto dto) throws IOException {
        return ResponseEntity.ok(service.createPost(dto));
    }

    @GetMapping("/public/posts")
    public ResponseEntity<List<Post>> getallpost(){
        return ResponseEntity.ok(service.getAllpost());
    }

    @GetMapping("/public/getposts")
    public ResponseEntity<?> getposts(){
        return ResponseEntity.ok(postRepo.getPostWithUser());
    }
    @GetMapping("/public/post/{id}")
    public ResponseEntity<Post> getData(@PathVariable Long id){
        return ResponseEntity.ok(service.getPostById(id));
    }
}
