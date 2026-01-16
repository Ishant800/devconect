package com.example.auth_service.Service;

import com.example.auth_service.Entity.User;
import com.example.auth_service.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public User cerateUser(User user){
        return userRepo.save(user);
    }
}
