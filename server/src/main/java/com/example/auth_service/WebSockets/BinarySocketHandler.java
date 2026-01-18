package com.example.auth_service.WebSockets;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.BinaryWebSocketHandler;

import java.nio.ByteBuffer;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


@Component
public class BinarySocketHandler extends BinaryWebSocketHandler {

    //shared memory : who is connected
    private static final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

    //called when user connects
    @Override
    public void afterConnectionEstablished(WebSocketSession session){
        sessions.put(session.getId(), session);
        System.out.println("Binary client connected : "+session.getId());

    }

    //main method: receives binary data
    @Override
    protected void handleBinaryMessage(WebSocketSession session, BinaryMessage message){
        ByteBuffer buffer = message.getPayload();

        // first byte = message type
        byte type = buffer.get();

        //remaining bytes is data
        byte[] data = new byte[buffer.remaining()];
        buffer.get(data);

        switch (type){
            case 1 -> handleText(session,data);
            case 2 -> handleImage(session,data);
            case 3 -> handleRealtime(session,data);
            default -> System.out.println("Unknown binary");
        }

    }

    //text handler
    private void handleText(WebSocketSession sender,byte[] data){
        String text = new String(data);
        System.out.println("Text: "+data);
        broadcast(sender,data,(byte) 1);
    }

    // IMAGE handler
    private void handleImage(WebSocketSession sender, byte[] data) {
        System.out.println("Image received: " + data.length + " bytes");
        broadcast(sender, data, (byte) 2);
    }

    // REALTIME handler (typing, cursor, etc.)
    private void handleRealtime(WebSocketSession sender, byte[] data) {
        broadcast(sender, data, (byte) 3);
    }

    // Send binary to everyone except sender
    private void broadcast(WebSocketSession sender, byte[] data, byte type) {
        sessions.values().forEach(session -> {
            if (session.isOpen() && !session.getId().equals(sender.getId())) {
                try {
                    ByteBuffer buffer = ByteBuffer.allocate(1 + data.length);
                    buffer.put(type);
                    buffer.put(data);
                    buffer.flip();
                    session.sendMessage(new BinaryMessage(buffer));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        sessions.remove(session.getId());
        System.out.println("Binary client disconnected: " + session.getId());
    }

}
