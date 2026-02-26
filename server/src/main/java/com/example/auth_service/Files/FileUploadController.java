package com.example.auth_service.Files;

import com.example.auth_service.Cloudinary.CloudinaryService;
import com.example.auth_service.WebSockets.ChatMessage;
import com.example.auth_service.WebSockets.MySocketHandler;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/fileUpload")
public class FileUploadController {
    private final CloudinaryService cloudinaryService;
    private final MySocketHandler socketHandler;

    public FileUploadController(CloudinaryService cloudinaryService, MySocketHandler socketHandler) {
        this.cloudinaryService = cloudinaryService;
        this.socketHandler = socketHandler;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(
            @RequestParam("file")MultipartFile file,
            @RequestParam(required = false) String to
            ){
        // upload to controller
        String fileUrl = cloudinaryService.uplaodFile(file);

        //2.create chat message event
        ChatMessage message = new ChatMessage();
        message.setEvent("FILE");
        message.setFileUrl(fileUrl);
        message.setTo(to);
        message.setMessage("file shared");
        message.setTimestamp(LocalDateTime.now());


        //3.Broadcast via websockets
        socketHandler.broadcastFileUrl(message);

        //4.return url to sender
        return ResponseEntity.ok(fileUrl);
    }

}
