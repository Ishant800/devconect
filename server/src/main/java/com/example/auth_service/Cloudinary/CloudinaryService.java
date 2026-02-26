package com.example.auth_service.Cloudinary;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.fasterxml.jackson.databind.deser.std.ObjectArrayDeserializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

//    public Map uplaodFile(MultipartFile file) throws IOException{
//        return cloudinary.uploader()
//                .upload(file.getBytes(),
//                        ObjectUtils.asMap("folder","auth"));
//    }



    public String uplaodFile(MultipartFile file){
        try{
            Map uplaod = cloudinary.uploader().upload(file.getBytes(),
                    ObjectUtils.emptyMap());

            return uplaod.get("secure_url").toString();
        } catch (IOException e) {
            throw new RuntimeException("Cloudinary file upload failed",e);
        }
    }

    public Map deleteFile(String publicId) throws IOException{
        return cloudinary.uploader()
                .upload(publicId,ObjectUtils.emptyMap());
    }
}
