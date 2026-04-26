package com.example.auth_service.WebSockets;

import com.example.auth_service.WebSockets.videocall.SignalHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;


@Configuration
@EnableWebSocket
public class WebsocketConfig implements WebSocketConfigurer {

    //mysockethandler
    public final SignalHandler signalHandler;
    public final MySocketHandler mySocketHandler;
    public final BinarySocketHandler binarySocketHandler;
    public final FileUploadHandler fileUploadHandler;
    public WebsocketConfig(SignalHandler signalHandler, MySocketHandler mySocketHandler, BinarySocketHandler binarySocketHandler, FileUploadHandler fileUploadHandler){
        this.signalHandler = signalHandler;
        this.mySocketHandler = mySocketHandler;
        this.binarySocketHandler = binarySocketHandler;
        this.fileUploadHandler = fileUploadHandler;
    }


    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(mySocketHandler,"/ws")
                .addHandler(binarySocketHandler,"/ws-binary")
                .addHandler(fileUploadHandler,"/ws-file")
                .addHandler(signalHandler,"/signal")
                .setAllowedOrigins("*");

    }
}
