package com.example.crud.entity;

import com.example.crud.repository.ProductRepository;
import com.example.crud.repository.UserRepository;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class DataInitializer
  implements ApplicationListener<ContextRefreshedEvent> {

  private final UserRepository userRepository;
  private final ProductRepository productRepository;

  public DataInitializer(
    UserRepository userRepository,
    ProductRepository productRepository
  ) {
    this.userRepository = userRepository;
    this.productRepository = productRepository;
  }

  @Override
  @Transactional
  public void onApplicationEvent(ContextRefreshedEvent event) {
    if (userRepository.count() == 0) {
      createUserAdmin();
      initializeProducts();
    }
  }

  private void createUserAdmin() {
    User admin = new User();
    admin.setFirstName("Samuel");
    admin.setLastName("Arango");
    admin.setEmail("superajke@gmail.com");
    admin.setPassword("123");
    admin.setRole(UserRole.ADMIN);
    admin.setActive(ActiveItem.ACTIVE);

    userRepository.save(admin);
  }

  private void initializeProducts() {
    Product product = new Product();
    product.setActive(ActiveItem.ACTIVE);
    product.setProductDescription("Jugo de naranja con vodka");
    product.setProductName("Five loko");
    product.setProductPrice(20000);
    product.setProductStock(10);

    productRepository.save(product);
  }
}
