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

  public void saveOrUpdate(User user) throws Exception {
    if (user.getUserId() == null) {
      Optional<User> existingUserByEmail = userRepository.findByEmail(
        user.getEmail()
      );
      if (existingUserByEmail.isPresent()) {
        throw new Exception("El correo ya está en uso");
      }
    } else {
      Optional<User> existingUser = userRepository.findById(user.getUserId());
      if (existingUser.isPresent()) {
        String currentPassword = existingUser.get().getPassword();
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
          user.setPassword(currentPassword);
        }
      } else {
        throw new Exception("El usuario no existe");
      }
    }
    userRepository.save(user);
  }

  public void updateUser(User user) throws Exception {
    if (user.getUserId() == null) {
      throw new Exception(
        "El ID del usuario no puede ser nulo para una actualización"
      );
    } else {
      Optional<User> existingUserOptional = userRepository.findById(
        user.getUserId()
      );
      if (existingUserOptional.isPresent()) {
        User existingUser = existingUserOptional.get();

        Optional<User> existingUserByEmail = userRepository.findByEmail(
          user.getEmail()
        );
        if (
          existingUserByEmail.isPresent() &&
          !existingUserByEmail.get().getUserId().equals(user.getUserId())
        ) {
          throw new Exception("El correo ya está en uso");
        }

        existingUser.setFirstName(user.getFirstName());
        existingUser.setLastName(user.getLastName());
        existingUser.setEmail(user.getEmail());
        existingUser.setRole(user.getRole());

        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
          existingUser.setPassword(user.getPassword());
        } else {
          existingUser.setPassword(existingUser.getPassword());
        }

        userRepository.save(existingUser);
      } else {
        throw new Exception("El usuario no existe");
      }
    }
  }

  public void deleteUserById(Long id) {
    Optional<User> userOpt = userRepository.findById(id);

    if (userOpt.isPresent()) {
      User user = userOpt.get();
      user.toggleActiveStatus();
      userRepository.save(user);
    } else {}
  }
}
