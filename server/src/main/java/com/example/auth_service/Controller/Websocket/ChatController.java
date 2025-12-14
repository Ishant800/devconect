package com.example.auth_service.Controller.Websocket;

import com.example.auth_service.Entity.Message;
import com.example.auth_service.Websockets.Payloads.GreetResponse;
import com.example.auth_service.Websockets.Payloads.Notifications;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public String sendMessage(String message){
        return "server received: " + message;
    }


    @MessageMapping("/message")
    @SendTo("/topic/received-message")
    public Message onMessage(Message message){
        System.out.println("Received from client: "+ message.getContent());
        return message;
    }

    //event 1
    @MessageMapping("/greet")
    @SendTo("/topic/greet-response")
    public GreetResponse greet(String name){
        return new GreetResponse("hello "+name);
    }


    @MessageMapping("/notify")
    @SendTo("/topic/notification")
    public Notifications notify(String message){
        return new Notifications("server notice",message);
    }


    @MessageMapping("/echo")
    @SendTo("/topic/echo-response")
    public String echo(String msg){
        return "ECHO from server: "+ msg;
    }
}
