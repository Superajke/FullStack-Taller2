package com.example.crud.jwt;

import com.example.crud.config.JwtProperties;
import com.example.crud.entity.User;
import com.example.crud.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
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
    Key key = Keys.hmacShaKeyFor(jwtProperties.getSecret().getBytes());
    return Jwts
      .builder()
      .setSubject(user.getEmail())
      .setIssuedAt(new Date(System.currentTimeMillis()))
      .setExpiration(
        new Date(System.currentTimeMillis() + jwtProperties.getExpiration())
      )
      .signWith(key, SignatureAlgorithm.HS512)
      .compact();
  }

  public boolean validateToken(String token) {
    try {
      Key key = Keys.hmacShaKeyFor(jwtProperties.getSecret().getBytes());
      Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
      return true;
    } catch (Exception e) {
      e.printStackTrace();
      return false;
    }
  }

  public User getUserFromToken(String token) {
    Key key = Keys.hmacShaKeyFor(jwtProperties.getSecret().getBytes());
    Claims claims = Jwts
      .parserBuilder()
      .setSigningKey(key)
      .build()
      .parseClaimsJws(token)
      .getBody();

    String userEmail = claims.getSubject();
    return userService.getUserByEmail(userEmail).orElse(null);
  }
}
