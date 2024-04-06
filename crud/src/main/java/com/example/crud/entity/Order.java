package com.example.crud.entity;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;
import lombok.Data;

@Data
@Entity
@Table(name = "orders")
public class Order {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long orderId;

  @Column(name = "total_price", nullable = false)
  private double totalPrice;

  @Column(name = "order_date", nullable = false)
  private Date orderDate;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @OneToMany(mappedBy = "order")
  private List<OrderDetail> orderDetails;
}
