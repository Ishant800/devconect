package com.example.auth_service.Cloudinary;

import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {
     public String cloud_name = "djh5owgby";
     public String api_key = "321633291255335";
     public String api_secret = "37PdgwDLqBJ1pah2VM4GydWzyBg";

     @Bean
    public Cloudinary cloudinary(){
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name",cloud_name,
                "api_key",api_key,
                "api_secret",api_secret,
                "secure",true
        ));
    }

}
