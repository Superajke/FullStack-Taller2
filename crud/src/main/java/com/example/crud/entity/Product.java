package com.example.crud.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "product")
public class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long productId;

  @Column(name = "product_name", nullable = false)
  private String productName;

  @Column(name = "product_description")
  private String productDescription;

  @Column(name = "product_price", nullable = false)
  private int productPrice;

  @Column(name = "product_stock", nullable = false)
  private int productStock;

  @Enumerated(EnumType.STRING)
  @Column(name = "product_active", length = 20)
  private ActiveItem active = ActiveItem.ACTIVE;

  public void toggleActiveStatus() {
    if (this.active == ActiveItem.ACTIVE) {
      this.active = ActiveItem.INACTIVE;
    } else {
      this.active = ActiveItem.ACTIVE;
    }
  }
}
