package com.example.auth_service.Service;

import com.example.auth_service.Cloudinary.CloudinaryService;
import com.example.auth_service.Dto.PostUpdateDto;
import com.example.auth_service.Entity.Post;
import com.example.auth_service.Entity.User;
import com.example.auth_service.Repository.AuthRepo;
import com.example.auth_service.Repository.PostRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class PostService {
    @Autowired
    private AuthRepo repo;

    @Autowired
    private PostRepo postRepo;

    @Autowired
    private CloudinaryService cloudinaryService;

    public Post createPost(PostUpdateDto dto, MultipartFile postImage) throws IOException {
        Long userId = dto.getUserId();;
        User user = repo.findById(userId).orElseThrow(()-> new RuntimeException("user not found"));

        Post post = new Post();
        post.setUser(user);
        post.setContent(dto.getContent());
        post.setCreatedAt(LocalDateTime.now());

        if(postImage != null && !postImage.isEmpty()){
            Map uploadResult = cloudinaryService.uplaodFile(postImage);
            String imageUrl = uploadResult.get("secure_url").toString();
            post.setImageUrl(imageUrl);
        }

        return postRepo.save(post);

    }

    public List<Post> getAllpost(){
        return postRepo.findAll();
    }
}
