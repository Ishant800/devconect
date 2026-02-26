package com.example.auth_service.WebSockets;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;

import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Consumer;

@Component
public class MySocketHandler extends TextWebSocketHandler {

    /*
     ============================================================
     1. SHARED MEMORY STORAGE
     ============================================================

     sessions → stores active websocket sessions
     users → maps sessionId → username

     Why ConcurrentHashMap?
     Because multiple users access simultaneously (thread-safe)
    */

    private static final Map<String, WebSocketSession> sessions =
            new ConcurrentHashMap<>();

    private static final Map<String, String> users =
            new ConcurrentHashMap<>();


    /*
     ============================================================
     2. OBJECT MAPPER

     Used to convert:

     JSON → ChatMessage object
     ChatMessage object → JSON
    */

    private final ObjectMapper objectMapper;


    /*
     ============================================================
     3. EVENT HANDLER REGISTRY

     event name → handler method mapping

     Example:
     PM → handlePrivateMessage
     BROADCAST → handleBroadcast
    */

    private final Map<String, Consumer<ChatMessage>> handlers =
            new ConcurrentHashMap<>();


    /*
     ============================================================
     4. CONSTRUCTOR

     Register all supported event handlers here
    */

    public MySocketHandler(ObjectMapper objectMapper) {

        this.objectMapper = objectMapper;

        handlers.put("PM", this::handlePrivateMessage);

        handlers.put("BROADCAST", this::handleBroadcast);

        handlers.put("NOTIFY", this::handleNotification);

        handlers.put("REALTIME", this::handleRealtimeEvent);

        handlers.put("FILE", this::handleFileMessage); // for file URLs
    }


    /*
     ============================================================
     5. CONNECTION ESTABLISHED

     Called when new client connects
    */

    @Override
    public void afterConnectionEstablished(WebSocketSession session)
            throws Exception {

        // Store session
        sessions.put(session.getId(), session);

        // Assign temporary username
        String username = "User_" + session.getId().substring(0, 5);

        users.put(session.getId(), username);

        System.out.println("Connected: " + username);

        // Notify client of assigned username
        session.sendMessage(
                new TextMessage("Connected as: " + username)
        );
    }


    /*
     ============================================================
     6. MAIN MESSAGE HANDLER

     Called when client sends message
    */

    @Override
    protected void handleTextMessage(
            WebSocketSession session,
            TextMessage textMessage
    ) throws Exception {

        try {

            // Convert JSON → ChatMessage
            ChatMessage message =
                    objectMapper.readValue(
                            textMessage.getPayload(),
                            ChatMessage.class
                    );

            // Attach sender
            message.setFrom(users.get(session.getId()));

            // Attach timestamp
            message.setTimestamp(LocalDateTime.now());


            // Find event handler
            Consumer<ChatMessage> handler =
                    handlers.get(message.getEvent());


            if (handler == null) {

                sendError(session,
                        "Unknown event: " + message.getEvent());

                return;
            }

            // Execute handler
            handler.accept(message);

        } catch (Exception e) {

            sendError(session, "Invalid message format");

            e.printStackTrace();
        }
    }


    /*
     ============================================================
     7. CONNECTION CLOSED
    */

    @Override
    public void afterConnectionClosed(
            WebSocketSession session,
            CloseStatus status
    ) {

        String username = users.get(session.getId());

        sessions.remove(session.getId());

        users.remove(session.getId());

        System.out.println("Disconnected: " + username);
    }


    /*
     ============================================================
     8. EVENT HANDLERS
     ============================================================
    */


    /*
     PRIVATE MESSAGE HANDLER
     Send message to specific user
    */

    private void handlePrivateMessage(ChatMessage message) {

        WebSocketSession target =
                findSessionByUsername(message.getTo());

        if (target != null && target.isOpen()) {

            sendMessage(target, message);
        }
    }


    /*
     BROADCAST MESSAGE HANDLER
     Send message to all users
    */

    private void handleBroadcast(ChatMessage message) {

        sessions.values().forEach(session -> {

            if (session.isOpen()) {

                sendMessage(session, message);
            }
        });
    }


    /*
     SYSTEM NOTIFICATION HANDLER
    */

    private void handleNotification(ChatMessage message) {

        message.setFrom("SYSTEM");

        handleBroadcast(message);
    }


    /*
     REALTIME EVENT HANDLER

     Used for:
     typing indicator
     live updates
    */

    private void handleRealtimeEvent(ChatMessage message) {

        if (message.getTo() != null) {

            handlePrivateMessage(message);

        } else {

            handleBroadcast(message);
        }
    }


    /*
     FILE MESSAGE HANDLER

     This is used when file uploaded via HTTP
     and file URL is emitted via WebSocket
    */

    private void handleFileMessage(ChatMessage message) {

        handleBroadcast(message);
    }


    /*
     ============================================================
     9. HELPER METHODS
     ============================================================
    */


    /*
     Send ChatMessage object as JSON
    */

    private void sendMessage(
            WebSocketSession session,
            ChatMessage message
    ) {

        try {

            String json =
                    objectMapper.writeValueAsString(message);

            session.sendMessage(new TextMessage(json));

        } catch (Exception e) {

            e.printStackTrace();
        }
    }


    /*
     Send error message
    */

    private void sendError(
            WebSocketSession session,
            String error
    ) {

        try {

            session.sendMessage(
                    new TextMessage("ERROR: " + error)
            );

        } catch (Exception e) {

            e.printStackTrace();
        }
    }


    /*
     Find session by username
    */

    private WebSocketSession findSessionByUsername(
            String username
    ) {

        for (Map.Entry<String, String> entry : users.entrySet()) {

            if (entry.getValue().equals(username)) {

                return sessions.get(entry.getKey());
            }
        }

        return null;
    }


    /*
     ============================================================
     10. PUBLIC METHOD FOR FILE URL BROADCAST

     This will be called from FileUploadController
    */

    public void broadcastFileUrl(
            ChatMessage message
    ) {

        handleFileMessage(message);
    }

}