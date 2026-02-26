package com.example.auth_service.WebSockets;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.BinaryWebSocketHandler;
import java.nio.ByteBuffer;


@Component
public class BinarySocketHandler extends BinaryWebSocketHandler {

    @Override
    protected void handleBinaryMessage(WebSocketSession session, BinaryMessage message) throws Exception{

        // get the raw bytes from the message
        ByteBuffer buffer = message.getPayload();
        byte[] data = new byte[buffer.remaining()];
        buffer.get(data);

        System.out.println("Received binary data of length: "+ data.length + "bytes");

        //echo the same binary data back to the client (optional).
        session.sendMessage(new BinaryMessage(data));
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception{
        System.out.println("Client connected: "+ session.getId());
    }

    //called when connection closed
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception{
        System.out.println("Client disconnected "+session.getId() + ", reason: "+status);
    }
}
