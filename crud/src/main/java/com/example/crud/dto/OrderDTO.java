package com.example.crud.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {

  private Long userId;
  private List<OrderDetailDTO> orderDetails;
}
