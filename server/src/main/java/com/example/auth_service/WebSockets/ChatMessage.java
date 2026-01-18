package com.example.auth_service.WebSockets;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@AllArgsConstructor
@Getter
@Setter
public class ChatMessage {
    private String event;
    private String from;
    private String to;
    private String message;
    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern ="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime timestamp;

    public ChatMessage() {

    }
}
