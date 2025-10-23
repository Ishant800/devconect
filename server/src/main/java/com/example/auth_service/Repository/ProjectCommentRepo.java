package com.example.auth_service.Repository;

import com.example.auth_service.Entity.ProjectComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectCommentRepo extends JpaRepository<ProjectComment,Long> {
}
