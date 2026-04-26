package com.example.auth_service.Repository;

import com.example.auth_service.Dto.PostView;
import com.example.auth_service.Entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepo extends JpaRepository<Post,Long> {
    @Query("""
            SELECT p.id AS id,
            p.content AS content,
            u.username AS username,
            p.imageUrl AS imageUrl
            FROM Post p
            JOIN p.user u
            """)
    List<PostView> getPostWithUser();

}
