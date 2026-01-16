package com.example.auth_service.WebSockets;

import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class MyWebSocketHandler extends TextWebSocketHandler {
    //store all connected users
    private static final Map<String,WebSocketSession> sessions = new ConcurrentHashMap<>();
    //store user info
    private static final Map<String,String> userNames = new ConcurrentHashMap<>();


    //1. when client connects
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String sessionId = session.getId();
        sessions.put(sessionId,session);
        System.out.println("New connection! " + sessionId);
        System.out.println("Remote address: "+ session.getRemoteAddress());
        System.out.println("Total connections: "+ sessions.size());

        String welcomeMsg = "Welcome! Your session ID: " + sessionId +
                "\n Send 'name:YOUR_NAME' to set your name" +
                "\n Send 'list' to see all users" +
                "\n Send 'broadcast:MESSAGE' to broadcast to everyone";

        session.sendMessage(new TextMessage(welcomeMsg));

    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception{
        String sessionId = session.getId();
        String payload = message.getPayload().trim();
        String userName = userNames.getOrDefault(sessionId,"Guest-"+ sessionId.substring(0,6));


        System.out.println("Received Text from "+userName + ": "+ payload);
        //handle different commands3
        if(payload.startsWith("name:")){
            //set user name
            String newName = payload.substring(5).trim();

            if(newName.isBlank() || newName.length() > 20){
                session.sendMessage(new TextMessage("Invalid name. User 1-20 characters."));
                return;

            }
            userNames.put(sessionId,newName);
            session.sendMessage(new TextMessage("Name set to: "+ newName));
        }else if(payload.startsWith("broadcast:")){
            //broadcast message
            String msg = payload.substring(10).trim();
            if(!msg.isEmpty()){
                broadcastToAll(" "+ userName + ": "+msg);
            }
        }
        else if(payload.startsWith("pm:")){
            //private message format: pm:username:message
            String[] parts = payload.split(":",3);
            if(parts.length < 3){
                session.sendMessage(new TextMessage("X Invalid PM format. Use pm:username:message"));
                return ;
            }
            String targetName = parts[1].trim();
            String pmMessage = parts[2].trim();

            boolean sent = false;
            for(Map.Entry<String,String> entry : userNames.entrySet()){
                if(entry.getValue().equalsIgnoreCase(targetName)){
                    WebSocketSession targetSession = sessions.get(entry.getKey());
                    if(targetSession != null && targetSession.isOpen()){
                        targetSession.sendMessage(new TextMessage("PM from "+ userName + ": "+pmMessage));
                        session.sendMessage(new TextMessage("Pm message sent to "+ targetName));
                        sent = true;
                        break;
                    }
                }
            }
            if(!sent){
                session.sendMessage(new TextMessage("User "+ targetName + "not found or offline."));
            }

        }
        else{
           session.sendMessage(new TextMessage("🕒 [" + LocalDateTime.now() + "] " + userName + ": " + payload));
        }
    }

    private void broadcastToAll(String message) throws IOException{
        for(WebSocketSession s: sessions.values()){
            if(s.isOpen()){

                try{
                    s.sendMessage(new TextMessage(message));
                }catch (IOException e){
                    System.out.println("Failed to send to "+ s.getId());
                }
            }
        }
    }


    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        System.out.println("Error occurred: "+ exception.getMessage());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
        String sessionId = session.getId();
        String userName = userNames.getOrDefault(sessionId,"Guest");
        sessions.remove(sessionId);
        userNames.remove(sessionId);
        System.out.println("Connection closed. Remaining: "+ sessions.size());

        if(!sessions.isEmpty()){
            broadcastToAll("\uD83D\uDC4B" + userName + "left the chat");
        }


    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }
}
