package com.example.crud.controller;

import com.example.crud.dto.OrderDTO;
import com.example.crud.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/order")
public class OrderController {

  @Autowired
  private OrderService orderService;

  @PostMapping
  public ResponseEntity<?> createOrder(@RequestBody OrderDTO orderDTO) {
    try {
      orderService.createOrder(orderDTO);
      return ResponseEntity.ok("Orden creada exitosamente.");
    } catch (Exception e) {
      return ResponseEntity
        .badRequest()
        .body("Error al crear la orden: " + e.getMessage());
    }
  }
}
