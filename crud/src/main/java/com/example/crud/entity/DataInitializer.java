package com.example.crud.entity;

import com.example.crud.repository.UserRepository;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class DataInitializer
  implements ApplicationListener<ContextRefreshedEvent> {

  private final UserRepository userRepository;

  public DataInitializer(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  @Transactional
  public void onApplicationEvent(ContextRefreshedEvent event) {
    if (userRepository.count() == 0) {
      createUserAdmin();
    }
  }

  private void createUserAdmin() {
    User admin = new User();
    admin.setFirstName("Samuel");
    admin.setLastName("Arango");
    admin.setEmail("superajke@gmail.com");
    admin.setPassword("123");
    admin.setRole(UserRole.ADMIN);

    userRepository.save(admin);
  }
}
