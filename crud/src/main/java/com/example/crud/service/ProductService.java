package com.example.crud.service;

import com.example.crud.entity.ActiveItem;
import com.example.crud.entity.Product;
import com.example.crud.repository.ProductRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

  @Autowired
  private ProductRepository productRepository;

  public List<Product> getAllProducts() {
    return productRepository.findAll();
  }

  public Optional<Product> getProductById(Long productId) {
    return productRepository.findById(productId);
  }

  public void saveOrUpdate(Product product) {
    productRepository.save(product);
  }

  public void deleteProductById(Long id) {
    Optional<Product> productOpt = productRepository.findById(id);

    if (productOpt.isPresent()) {
      Product product = productOpt.get();
      product.toggleActiveStatus();
      productRepository.save(product);
    } else {}
  }
}
