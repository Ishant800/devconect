package com.example.auth_service.Websockets.Payloads;


import lombok.Data;

@Data
public class Notifications {
    private String title;
    private String body;

    public Notifications(){

    }
    public Notifications(String title,String body){
        this.title = title;
        this.body = body;
    }
}
