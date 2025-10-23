package com.example.auth_service.Controller.Project;

import com.example.auth_service.Dto.Project.ProjectCommentDto;
import com.example.auth_service.Entity.ProjectComment;
import com.example.auth_service.Service.ProjectCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class CommentController {

    @Autowired
    private ProjectCommentService service;

    @PostMapping("/public/addcomment")
    public ResponseEntity<ProjectComment> createComment(@RequestBody ProjectCommentDto dto){
        return ResponseEntity.ok(service.createComment(dto));
    }
}
