package com.example.auth_service.Email;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class Emailsender {
    @Autowired
    private JavaMailSender javaMailSender;

    public void sendOtp(String toemail,String otp){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("ishantkarmacharya@gmail.com");
        message.setTo(toemail);
        message.setSubject("OTP(one time password)");
        message.setText("Your Otp is "+ otp);

        javaMailSender.send(message);

    }
}
