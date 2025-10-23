package com.example.auth_service.Controller.Project;

import com.example.auth_service.Dto.Project.ProjectDto;
import com.example.auth_service.Entity.Project;
import com.example.auth_service.Service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin("*")
public class ProjectController {
    @Autowired
    private ProjectService service;


    @PostMapping(value = "/public/addproject", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Project> create(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("tags") String tags,
            @RequestParam("techStack") String techStack,
            @RequestParam("link") String link,
            @RequestParam(value = "projectImage", required = false) MultipartFile projectImage
    ) throws IOException {

        // Create DTO from individual parameters
        ProjectDto dto = new ProjectDto();
        dto.setTitle(title);
        dto.setDescription(description);
        dto.setTags(tags);
        dto.setTechStack(techStack);
        dto.setLink(link);

        return ResponseEntity.ok(service.createProject(dto, projectImage));
    }

    @GetMapping("/public/projejct/{projectId}")
    public ResponseEntity<Project> getProject(@PathVariable Long projectId){
        Project project = service.getproject(projectId);
        return ResponseEntity.ok(project);
    }
}
