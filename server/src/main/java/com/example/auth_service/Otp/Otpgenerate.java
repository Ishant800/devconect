package com.example.auth_service.Otp;

import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class Otpgenerate {

    public String generateNumbericOtp(int lenght){
        String numbers = "0123456789";
        Random random = new Random();
        StringBuilder otp = new StringBuilder();

        for(int i=0;i<lenght;i++){
            otp.append(numbers.charAt(random.nextInt(numbers.length())));
        }
        return otp.toString();
    }

    public String generateSixDigitOtp(){
        return generateNumbericOtp(6);
    }
}
