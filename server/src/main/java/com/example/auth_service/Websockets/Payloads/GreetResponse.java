package com.example.auth_service.Websockets.Payloads;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class GreetResponse {
    private String message;

    public GreetResponse(String name) {
        this.message = "hello " + name;
    }
}
