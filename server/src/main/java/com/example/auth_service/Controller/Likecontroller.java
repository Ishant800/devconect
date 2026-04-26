package com.example.auth_service.Controller;

import com.example.auth_service.Entity.Like;
import com.example.auth_service.Repository.LikeRepo;
import com.example.auth_service.Repository.PostRepo;
import com.example.auth_service.Repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
public class Likecontroller {

     final LikeRepo likeRepo;
     private final UserRepo userRepo;
     private final PostRepo postRepo;

     @PostMapping("/like")
    public ResponseEntity<?> toggleLike(
            @RequestParam Long userId,
            @RequestParam Long postId
     ){
         Optional<Like> existing = likeRepo.findByUserIdAndPostId(userId,postId);
         if(existing.isPresent()){
             likeRepo.delete(existing.get());
             return ResponseEntity.ok("unliked");
         }else{
             Like like = new Like();
             User
             like.setUser(userRepo.findById(userId).get());
             like.setPost(postRepo.findById(postId).get());

             likeRepo.save(like);
             return ResponseEntity.ok("liked");
         }
     }
}
