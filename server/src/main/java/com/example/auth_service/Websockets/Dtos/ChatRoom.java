package com.example.auth_service.Websockets.Dtos;

import lombok.Data;
import java.util.HashSet;
import java.util.Set;

@Data
public class ChatRoom {
    private String roomId;
    private String roomName;
    private Set<String> participants = new HashSet<>();
    private int participantCount;
}
