package com.example.crud.controller;

import com.example.crud.entity.User;
import com.example.crud.jwt.JwtService;
import com.example.crud.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/v1/user")
public class UserController {

  @Autowired
  private UserService userService;

  @Autowired
  private JwtService jwtService;

  @PostMapping("/verifyToken")
  public ResponseEntity<?> verifyToken(HttpServletRequest request) {
    // Intentamos obtener la cookie llamada 'token'
    Cookie jwtCookie = Arrays
      .stream(request.getCookies())
      .filter(cookie -> "token".equals(cookie.getName()))
      .findFirst()
      .orElse(null);

    if (jwtCookie == null) {
      return ResponseEntity
        .status(401)
        .body("No se encontró la cookie de autenticación.");
    }

    String token = jwtCookie.getValue();
    if (!jwtService.validateToken(token)) {
      return ResponseEntity.status(401).body("Token inválido o expirado.");
    }

    User user = jwtService.getUserFromToken(token);
    return ResponseEntity.ok(user);
  }

  @GetMapping
  public List<User> getUsers() {
    return userService.getAllUsers();
  }

  @GetMapping(path = "/{userId}")
  public Optional<User> getUserById(@PathVariable("userId") Long userId) {
    return userService.getUserById(userId);
  }

  @GetMapping(path = "/email/{email}")
  public Optional<User> getUserByEmail(@PathVariable("email") String email) {
    return userService.getUserByEmail(email);
  }

  @PostMapping
  public ResponseEntity<String> saveUpdateUser(
    @RequestBody User user,
    HttpServletResponse response
  ) {
    userService.saveOrUpdate(user);
    String token = jwtService.generateToken(user);

    // Crear y enviar la cookie con el token JWT
    Cookie cookie = new Cookie("token", token);
    cookie.setHttpOnly(false);
    cookie.setPath("/");
    response.addCookie(cookie);

    return ResponseEntity.ok("Usuario registrado exitosamente.");
  }

  @DeleteMapping(path = "/{userId}")
  public void deleteById(@PathVariable("userId") Long userId) {
    userService.deleteUserById(userId);
  }
}
