package com.example.auth_service.WebSockets;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;


@Configuration
@EnableWebSocket
public class WebsocketConfig implements WebSocketConfigurer {
//    public final MyWebSocketHandler myWebSocketHandler;
//
//    public WebsocketConfig(MyWebSocketHandler myWebSocketHandler) {
//        this.myWebSocketHandler = myWebSocketHandler;
//    }


    //mysockethandler
    public final MySocketHandler mySocketHandler;
    public WebsocketConfig(MySocketHandler mySocketHandler){
        this.mySocketHandler = mySocketHandler;
    }


    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(mySocketHandler,"/ws")
                .setAllowedOrigins("*");

    }
}
