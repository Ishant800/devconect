package com.example.auth_service.WebSockets;

import java.time.LocalDateTime;

class FileInfo {
    private String fileName;      // What's the file called?
    private String uploadedBy;    // Who uploaded it?
    private long fileSize;        // How big is it? (in bytes)
    private LocalDateTime uploadTime;  // When was it uploaded?
    private String filePath;      // Where is it saved on disk?

    // Getters and setters (like doors to access the info)
    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }

    public String getUploadedBy() { return uploadedBy; }
    public void setUploadedBy(String uploadedBy) { this.uploadedBy = uploadedBy; }

    public long getFileSize() { return fileSize; }
    public void setFileSize(long fileSize) { this.fileSize = fileSize; }

    public LocalDateTime getUploadTime() { return uploadTime; }
    public void setUploadTime(LocalDateTime uploadTime) { this.uploadTime = uploadTime; }

    public String getFilePath() { return filePath; }
    public void setFilePath(String filePath) { this.filePath = filePath; }
}