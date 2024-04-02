package com.example.crud.service;

import com.example.crud.entity.User;
import com.example.crud.repository.UserRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  public Optional<User> getUserById(Long userId) {
    return userRepository.findById(userId);
  }

  public Optional<User> getUserByEmail(String email) {
    return userRepository.findByEmail(email);
  }

  public void saveOrUpdate(User user) {
    if (user.getUserId() != null) {
      // El usuario ya existe, es una actualización
      Optional<User> existingUser = userRepository.findById(user.getUserId());
      if (existingUser.isPresent()) {
        String currentPassword = existingUser.get().getPassword();
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
          user.setPassword(currentPassword);
        } else {}
      }
    }
    userRepository.save(user);
  }

  public void deleteUserById(Long id) {
    userRepository.deleteById(id);
  }
}
