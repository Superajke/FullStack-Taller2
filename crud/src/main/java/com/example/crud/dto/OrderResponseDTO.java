package com.example.crud.dto;

import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDTO {

  private Long orderId;
  private double totalPrice;
  private Date orderDate;
  private Long userId;
  private List<OrderDetailDTO> orderDetails;
}
