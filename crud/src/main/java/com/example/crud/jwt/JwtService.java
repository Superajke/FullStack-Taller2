package com.example.crud.jwt;

import com.example.crud.config.JwtProperties;
import com.example.crud.entity.User;
import com.example.crud.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

  @Autowired
  private UserService userService;

  @Autowired
  private JwtProperties jwtProperties;

  public String generateToken(User user) {
    return Jwts
      .builder()
      .setSubject(user.getEmail())
      .setIssuedAt(new Date(System.currentTimeMillis()))
      .setExpiration(
        new Date(System.currentTimeMillis() + jwtProperties.getExpiration())
      )
      .signWith(SignatureAlgorithm.HS512, jwtProperties.getSecret().getBytes())
      .compact();
  }

  public boolean validateToken(String token) {
    try {
      Jwts
        .parser()
        .setSigningKey(jwtProperties.getSecret().getBytes())
        .parseClaimsJws(token);
      return true;
    } catch (Exception e) {
      // Captura todas las excepciones específicas de JWT y cualquier excepción genérica
      e.printStackTrace();
      return false;
    }
  }

  public User getUserFromToken(String token) {
    Claims claims = Jwts
      .parser()
      .setSigningKey(jwtProperties.getSecret().getBytes())
      .parseClaimsJws(token)
      .getBody();

    String userEmail = claims.getSubject();
    return userService.getUserByEmail(userEmail).orElse(null);
  }
}
