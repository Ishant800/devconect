package com.example.auth_service.WebSockets;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.AbstractWebSocketHandler;
import org.springframework.web.socket.handler.BinaryWebSocketHandler;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class FileUploadHandler extends AbstractWebSocketHandler {

    // ==================== STORAGE AREAS ====================
    private static final Logger log = LoggerFactory.getLogger(FileUploadHandler.class);
    private static final int MAX_IMAGE_SIZE_BYTES = 5*1024*1024; // 5mb


    private final ConcurrentHashMap<String,WebSocketSession> sessions = new ConcurrentHashMap<>();
    private final ImageProcessingService imageService = new ImageProcessingService();


    @Override
    protected void handleBinaryMessage(WebSocketSession session,BinaryMessage message) throws Exception{
        try{
            if(!session.isOpen()) return;

            if(message.getPayloadLength() > MAX_IMAGE_SIZE_BYTES){
                String errorMsg = "Image too Large " + MAX_IMAGE_SIZE_BYTES;
                log.warn("client sent oversized image ");
                session.sendMessage(new TextMessage("error"));
                return;
            }

            ByteBuffer buffer = message.getPayload();
            byte[] imageData = new byte[buffer.remaining()];
            buffer.get(imageData);

            log.info("Received image ({} bytes) from client {}", imageData.length, session.getId());

            byte[] processed;
            try{
                processed = imageService.processImage(imageData);
            }catch (Exception e){
                log.error("Image processing failed",e);
                session.sendMessage(new TextMessage("Error"));
                return;
            }
            session.sendMessage(new BinaryMessage(processed));
        }
        catch (Exception e){
            log.error("Error handling image from session {}",session.getId(),e);

        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session){
        sessions.put(session.getId(),session);
        log.info("Image client connected : {} "+session.getId());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session,CloseStatus status){
        sessions.remove(session.getId());
        log.info("Image client disconnected: ",session.getId());
    }
}