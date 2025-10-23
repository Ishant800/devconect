package com.example.auth_service.Service;

import com.example.auth_service.Entity.User;
import com.example.auth_service.Repository.AuthRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final AuthRepo authRepo;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException{
        User auth = authRepo.findByEmail(email)
                .orElseThrow(()-> new UsernameNotFoundException("user not found from token"));

        return org.springframework.security.core.userdetails.User.builder()
                .username(auth.getEmail())
                .password(auth.getPassword())
                .roles(auth.getRole())
                .build();

    }
}
