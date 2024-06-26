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
@Table(name = "user")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long userId;

  @Column(name = "user_first_name", nullable = false)
  private String firstName;

  @Column(name = "user_last_name")
  private String lastName;

  @Column(name = "user_email", unique = true, nullable = false)
  private String email;

  @Column(name = "user_password", nullable = false)
  private String password;

  @Enumerated(EnumType.ORDINAL)
  @Column(name = "user_role", length = 20)
  private UserRole role = UserRole.CLIENTE;

  @Enumerated(EnumType.ORDINAL)
  @Column(name = "user_active", length = 20)
  private ActiveItem active = ActiveItem.INACTIVE;

  public void toggleActiveStatus() {
    if (this.active == ActiveItem.ACTIVE) {
      this.active = ActiveItem.INACTIVE;
    } else {
      this.active = ActiveItem.ACTIVE;
    }
  }
}
