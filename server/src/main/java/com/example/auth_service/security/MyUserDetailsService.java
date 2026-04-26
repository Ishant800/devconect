package com.example.auth_service.security;

import com.example.auth_service.Entity.User;
import com.example.auth_service.Repository.AuthRepo;
import com.example.auth_service.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {


    @Autowired
    private AuthRepo authRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = authRepo.findByUsername(username).orElseThrow(()-> new UsernameNotFoundException("user doesn't exists"));

        if(user.getUsername() == null) throw new UsernameNotFoundException("username not found") ;

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .roles("ROLE"+user.getRole())
                .build();
    }


}
