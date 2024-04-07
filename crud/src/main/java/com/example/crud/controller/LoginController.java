package com.example.crud.controller;

import com.example.crud.entity.User;
import com.example.crud.jwt.JwtService;
import com.example.crud.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

  @Autowired
  private UserService userService;

  @Autowired
  private JwtService jwtService;

  @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
  @PostMapping("/login")
  public ResponseEntity<?> processLogin(
    @RequestBody User user,
    HttpServletResponse response
  ) {
    Optional<User> userOptional = userService.getUserByEmail(user.getEmail());

    if (userOptional.isPresent()) {
      User retrievedUser = userOptional.get();
      if (retrievedUser.getPassword().equals(user.getPassword())) {
        String token = jwtService.generateToken(retrievedUser);

        Cookie cookie = new Cookie("token", token);
        cookie.setHttpOnly(false);
        cookie.setPath("/");
        response.addCookie(cookie);

        retrievedUser.setPassword(null);

        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("user", retrievedUser);
        return new ResponseEntity<>(responseBody, HttpStatus.OK);
      } else {
        return new ResponseEntity<>(
          "Contraseña incorrecta",
          HttpStatus.UNAUTHORIZED
        );
      }
    } else {
      return new ResponseEntity<>(
        "Email no encontrado",
        HttpStatus.UNAUTHORIZED
      );
    }
  }

  @PostMapping("/logout")
  public ResponseEntity<?> logout(HttpServletResponse response) {
    Cookie cookie = new Cookie("token", null);
    cookie.setHttpOnly(true);
    cookie.setPath("/");
    cookie.setMaxAge(0);
    response.addCookie(cookie);

    return ResponseEntity.ok().body("Sesión cerrada con éxito.");
  }
}
