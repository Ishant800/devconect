package com.example.auth_service.Service;

import com.example.auth_service.Cloudinary.CloudinaryService;
import com.example.auth_service.Dto.Project.ProjectDto;
import com.example.auth_service.Entity.Project;
import com.example.auth_service.Repository.ProjectRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepo repo;

    @Autowired
    private CloudinaryService cloudinaryService;

    public Project createProject(ProjectDto dto, MultipartFile projectImage) throws IOException {
        Project project = new Project();
        project.setTitle(dto.getTitle());
        project.setDescription(dto.getDescription());
        project.setLink(dto.getLink());
        project.setTags(dto.getTags());
        project.setViewCount(0);

        if(projectImage != null && !projectImage.isEmpty()){

            Map uploadResult = cloudinaryService.uplaodFile(projectImage);
            project.setProjectImage(uploadResult.get("secure_url").toString());
        }


        return repo.save(project);
    }

    public Project getproject(Long projectId){

        Project project = repo.findById(projectId).orElseThrow(()-> new RuntimeException("project not found"));
        project.setViewCount(project.getViewCount() + 1);
        return repo.save(project);

    }
}
