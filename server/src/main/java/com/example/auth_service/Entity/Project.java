package com.example.auth_service.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "projects")
@Data
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String techStack;
    private String link;

    private String projectImage;
    private String tags;
    private int viewCount;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "project",cascade = CascadeType.ALL)
   @JsonIgnoreProperties("project")
    private List<ProjectComment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "project",cascade = CascadeType.ALL)
    private List<ProjectLike> likes = new ArrayList<>();

    private LocalDateTime createdAt;

}
