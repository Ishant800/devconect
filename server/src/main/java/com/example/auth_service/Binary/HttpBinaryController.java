package com.example.auth_service.Binary;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@RestController
@RequestMapping("/http")
public class HttpBinaryController {
    private static final Path ROOT = Paths.get("storgae");

    public HttpBinaryController() throws IOException{
        // Create storage directory if missing
        Files.createDirectories(ROOT);
    }

    @PostMapping(value = "/upload-raw",
    consumes = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<String> uploadRaw(InputStream body) throws  IOException{
        Path file = ROOT.resolve("raw.bin");
        Files.copy(body,file, StandardCopyOption.REPLACE_EXISTING);
        return ResponseEntity.ok("Raw upload Successful");
    }


    @GetMapping("/download/{name}")
    public ResponseEntity<Resource> download(@PathVariable String name) throws IOException{
        Path file = ROOT.resolve(name);
        Resource resource = new FileSystemResource(file);


        //detect MIME type
        String contentType = Files.probeContentType(file);
        if(contentType == null){
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION,"inline; filename=\"" + name + "\"")
                .body(resource);
    }
}
