//package com.example.auth_service.WebSockets;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.springframework.stereotype.Component;
//import org.springframework.web.socket.*;
//import org.springframework.web.socket.handler.TextWebSocketHandler;
//import java.io.IOException;
//import java.time.LocalDateTime;
//import java.util.Map;
//import java.util.concurrent.ConcurrentHashMap;
//
//@Component
//public class MyWebSocketHandler extends TextWebSocketHandler {
//    //store all connected users
//    private static final Map<String,WebSocketSession> sessions = new ConcurrentHashMap<>();
//    //store user info
//    private static final Map<String,String> userNames = new ConcurrentHashMap<>();
//    private final ObjectMapper mapper;
//
//    public MyWebSocketHandler(ObjectMapper mapper) {
//        this.mapper = mapper;
//    }
//
//
//    //1. when client connects
//    @Override
//    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
//
//        sessions.put(session.getId(),session);
//        send(session,info("Server","Connected. Use SET_NAME,BROADCAST,PM,LIST"));
//
//    }
//
//    @Override
//    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception{
//          ChatMessage msg = mapper.readValue(message.getPayload(),ChatMessage.class);
//          String sessionId = session.getId();
//          String sender = userNames.getOrDefault(sessionId,"Guest");
//
//          switch(msg.getType()){
//              case "SET_NAME":
//                  userNames.put(sessionId, msg.getMessage());
//                  send(session,info("Server","Name set to "+ msg.getMessage()));
//                  break;
//
//              case "BROADCAST"  :
//                  broadcast(chat("BROADCAST",sender,null,msg.getMessage()));
//                  break;
//              case "PM":
//                  sendPrivate(sender, msg.getTo(), msg.getMessage(), session);
//                  break;
//
//              case "LIST":
//                  send(session, info("Server", userNames.values().toString()));
//                  break;
//
//              default:
//                  send(session, info("Server", "Unknown message type"));
//
//
//          }
//
//    }
//
//    private void broadcastToAll(String message) throws IOException{
//        for(WebSocketSession s: sessions.values()){
//            if(s.isOpen()){
//
//                try{
//                    s.sendMessage(new TextMessage(message));
//                }catch (IOException e){
//                    System.out.println("Failed to send to "+ s.getId());
//                }
//            }
//        }
//    }
//
//
//    @Override
//    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
//        System.out.println("Error occurred: "+ exception.getMessage());
//    }
//
//    @Override
//    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
//       String name = userNames.remove(session.getId());
//       sessions.remove(session.getId());
//
//       if(name != null){
//           broadcast(info("Server",name + "Left the chat"));
//       }
//
//    }
//
//
//    //helpers functions
//
//    private void broadcast(ChatMessage msg) throws IOException{
//        for(WebSocketSession s : sessions.values()){
//            if(s.isOpen()) send(s,msg);
//        }
//    }
//
//
//    private void sendPrivate(String from , String to,String message,WebSocketSession sender) throws IOException{
//        for(Map.Entry<String,String> entry: userNames.entrySet()){
//            if(entry.getValue().equalsIgnoreCase(to)){
//                WebSocketSession target = sessions.get(entry.getKey());
//                if(target != null && target.isOpen()){
//                    send(target,chat("PM",from,to,message));
//                    send(sender,info("Server","PM Sent to "+ to));
//                    return;
//                }
//            }
//        }
//        send(sender,info("Server","User notfound"));
//    }
//
//
//    private void send(WebSocketSession session,ChatMessage msg)throws IOException{
//        msg.setTimestamp(LocalDateTime.now());
//        session.sendMessage(new TextMessage(mapper.writeValueAsString(msg)));
//    }
//
//    private ChatMessage info(String from,String msg){
//        return chat("INFO",from,null,msg);
//    }
//    private ChatMessage chat(String type,String from,String to, String msg){
//        ChatMessage cm = new ChatMessage();
//        cm.setType(type);
//        cm.setFrom(from);
//        cm.setTo(to);
//        cm.setMessage(msg);
//        return cm;
//    }
//
//    @Override
//    public boolean supportsPartialMessages() {
//        return false;
//    }
//}
