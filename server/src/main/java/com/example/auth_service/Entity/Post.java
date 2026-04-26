package com.example.auth_service.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "posts")
@Data
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String content;
    private String imageUrl;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;


//    @OneToMany(mappedBy = "posts",cascade = CascadeType.ALL)
//    private List<Comment> comments = new ArrayList<>();
//
//    @OneToMany(mappedBy = "posts",cascade = CascadeType.ALL)
//    private List<Like> likes = new ArrayList<>();

    @PrePersist
    private void onCreate(){
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    private void onUpdate(){
        updatedAt = LocalDateTime.now();
    }

}
