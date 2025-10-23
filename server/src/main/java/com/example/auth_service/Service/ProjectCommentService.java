package com.example.auth_service.Service;

import com.example.auth_service.Dto.Project.ProjectCommentDto;
import com.example.auth_service.Entity.Project;
import com.example.auth_service.Entity.ProjectComment;
import com.example.auth_service.Entity.User;
import com.example.auth_service.Repository.AuthRepo;
import com.example.auth_service.Repository.ProjectCommentRepo;
import com.example.auth_service.Repository.ProjectRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectCommentService {
    @Autowired
    private ProjectCommentRepo repo;

    @Autowired
    private AuthRepo authRepo;

    @Autowired
    private ProjectRepo projectRepo;

    public ProjectComment createComment(ProjectCommentDto dto){
        User user = authRepo.findById(dto.getUserId()).orElseThrow(()-> new RuntimeException("user not found"));
        Project project = projectRepo.findById(dto.getProjectId()).orElseThrow(()-> new RuntimeException("project not found"));


        ProjectComment comment = new ProjectComment();
        comment.setProject(project);
        comment.setUser(user);
        comment.setText(dto.getText());

        return repo.save(comment);
    }
}
