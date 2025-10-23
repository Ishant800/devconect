package com.example.auth_service.Jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component

public class JwtUtils {

    private  SecretKey key;
    private  long jwtExpirations;
    private  long refreshExpirationMs;

    public JwtUtils(@Value("${jwt.secrete}") String secret,
                    @Value("${jwt.expiration-ms}") long jwtExpirations,
                    @Value("${jwt.refresh-expiration-ms}") long refreshExpirationMs) {
       if(secret == null || secret.isEmpty()){
           throw new IllegalArgumentException("Jwt secrete key must not be null or empty");
       }

        System.out.println(secret);

        if (secret.length() < 32) {
            throw new IllegalArgumentException("JWT secret must be at least 32 characters long for HS256");
        }

        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.jwtExpirations = jwtExpirations;
        this.refreshExpirationMs = refreshExpirationMs;
    }

    public String generateAccessToken(String userId,String username, String email, String role) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + jwtExpirations);

        return Jwts.builder()
                .setSubject(userId)
                .claim("username",username)
                .claim("email", email)
                .claim("role", role)
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }



    public String generateRefreshToken(String userId) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + refreshExpirationMs);

        return Jwts.builder()
                .setSubject(userId)
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException ex) {
            return false;
        }
    }

    public Claims getClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
    }

    public long getJwtExpirationMs() {
        return jwtExpirations;
    }
}
