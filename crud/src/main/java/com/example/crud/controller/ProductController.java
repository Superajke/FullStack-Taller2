package com.example.crud.controller;

import com.example.crud.entity.Product;
import com.example.crud.service.ProductService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/v1/product")
public class ProductController {

  @Autowired
  private ProductService productService;

  @GetMapping
  public List<Product> getProducts() {
    return productService.getAllProducts();
  }

  @GetMapping("/{productId}")
  public Product getProductById(@PathVariable("productId") Long productId) {
    return productService.getProductById(productId).orElse(null);
  }

  @PostMapping
  public void saveUpdateProduct(@RequestBody Product products) {
    productService.saveOrUpdate(products);
  }

  @DeleteMapping("/{productId}")
  public void deleteProductById(@PathVariable("userId") Long productId) {
    productService.deleteProductById(productId);
  }
}
