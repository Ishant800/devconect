package com.example.auth_service.Service;

import com.example.auth_service.Cloudinary.CloudinaryService;
import com.example.auth_service.Dto.PostUpdateDto;
import com.example.auth_service.Entity.Post;
import com.example.auth_service.Entity.User;
import com.example.auth_service.Repository.AuthRepo;
import com.example.auth_service.Repository.PostRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class PostService {
    @Autowired
    private AuthRepo repo;

    @Autowired
    private PostRepo postRepo;

    @Autowired
    private CloudinaryService cloudinaryService;

    public Post createPost(PostUpdateDto dto) throws IOException {

        User user = repo.findById(dto.getUserId()).orElseThrow(()-> new RuntimeException("user not found"));

        Post post = new Post();
        post.setUser(user);
        post.setContent(dto.getContent());
        post.setCreatedAt(LocalDateTime.now());

        if(dto.getImageUrl() != null && !dto.getImageUrl().isEmpty()){
            String imageUrl = cloudinaryService.uplaodFile(dto.getImageUrl());
            post.setImageUrl(imageUrl);
        }

        return postRepo.save(post);

    }

    public List<Post> getAllpost(){
        return postRepo.findAll();
    }

    public Post getPostById(Long id){
        Post post = postRepo.findById(id).orElseThrow(()-> new RuntimeException("post nowt found"));
        return post;
    }

    public void deletePost(Long id){
        Post post = postRepo.findById(id).orElseThrow(()-> new RuntimeException("posts not found"));
         postRepo.deleteById(id);
    }
}
