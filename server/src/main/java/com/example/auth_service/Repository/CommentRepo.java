package com.example.auth_service.Repository;

import com.example.auth_service.Entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepo extends JpaRepository<Comment, Long> {

    List<Comment> findByPostId(Long postId);

    Long countByPostId(Long postId);
}