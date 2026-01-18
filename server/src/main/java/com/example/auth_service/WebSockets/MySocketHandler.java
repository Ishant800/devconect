package com.example.auth_service.WebSockets;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Consumer;

@Component
public class MySocketHandler extends TextWebSocketHandler {
    //1.shared memory for sessions

    //key = session ID and in Value we store webSocketSession object
    private static final Map<String ,WebSocketSession > sessions = new ConcurrentHashMap<>();

    //key = sessionId and in value we store names
    private static final Map<String ,String> users = new ConcurrentHashMap<>();

    // 2.objectmapper initialize the objectmapper for converting  json to objects
    private final ObjectMapper objectMapper;


    // 3.event -> handler mapping
    private final Map<String , Consumer<ChatMessage>> handlers = new ConcurrentHashMap<>();

    // .this is a constructor not a big deal
    public MySocketHandler(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
        handlers.put("PM",this::handlePrivateMessage);
        handlers.put("BROADCAST",this::handleBroadCast);
        handlers.put("NOTIFY",this::handleNotifications);
        handlers.put("REALTIME",this::handleRealtime);
    }

    //4.constructor : register event handlers


    // connections lifecycle
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {

        sessions.put(session.getId(),session);
        // temporary assign user as "User" + sessionId(in real app, login Sets name)
        users.put(session.getId(),"User"+session.getId().substring(0,4));
        System.out.println("new connection: "+users.get(session.getId()));
        session.sendMessage(new TextMessage("User name: "+users.get(session.getId())));
    }

    //main methods
    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

        //1.converts json string to java objects
        ChatMessage msg = objectMapper.readValue(message.getPayload(),ChatMessage.class);

        //2 attach sender and timestamp (never trust client!)
        msg.setFrom(users.get(session.getId()));
        msg.setTimestamp(LocalDateTime.now());


        // 3.look up handler . type means the event name
        Consumer<ChatMessage> handler = handlers.get(msg.getEvent());

        //4. unknown event? tell client
        if(handler == null){
            session.sendMessage(new TextMessage("Unknown event: "+ msg.getEvent()));
            return ;
        }

        handler.accept(msg);

    }


    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
        System.out.println("Connection closed: "+users.get(session.getId()));
        sessions.remove(session.getId());
        users.remove(session.getId());
    }

    // 7a. handlers method means helping methods
    private void handlePrivateMessage(ChatMessage message){
        WebSocketSession target = findSessionByUser(message.getTo());
        System.out.println(target);
        if(target != null && target.isOpen()){
            send(target,message);
        }

    }

    //7b. Broadcast message
    private void handleBroadCast(ChatMessage message){
        sessions.values().forEach(s-> {
            if (s.isOpen()) send(s,message);
        });
    }

    // 7c. notifications
    private void handleNotifications(ChatMessage message){
       // or any from name
        message.setFrom("System");
        handleBroadCast(message); // system message goes to everyone so that's why
    }

    //7d . realtime event(typing / live updates)
    private void handleRealtime(ChatMessage msg){
        // no persistence, just fast broadcast
        if(msg.getTo() != null){
            WebSocketSession target = findSessionByUser(msg.getTo());
            if(target != null && target.isOpen()){
                send(target,msg);
            }
        }
        else handleBroadCast(msg);
    }

    //8 . helper methods
    //send chatmessage as json to session
    private void send(WebSocketSession session,ChatMessage message){
        try{
            String json = objectMapper.writeValueAsString(message);
            session.sendMessage(new TextMessage(json));
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }


    //find session by username
    private WebSocketSession findSessionByUser(String username){
        for(Map.Entry<String,String> entry: users.entrySet()){
            if(entry.getValue().equals(username)){
                return sessions.get(entry.getKey());
            }
        }
        return null;
    }
}
