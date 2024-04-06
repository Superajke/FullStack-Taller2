package com.example.crud.service;

import com.example.crud.dto.OrderDTO;
import com.example.crud.dto.OrderDetailDTO;
import com.example.crud.dto.OrderResponseDTO;
import com.example.crud.entity.Order;
import com.example.crud.entity.OrderDetail;
import com.example.crud.entity.Product;
import com.example.crud.entity.User;
import com.example.crud.exception.InsufficientStockException;
import com.example.crud.repository.OrderDetailRepository;
import com.example.crud.repository.OrderRepository;
import com.example.crud.repository.ProductRepository;
import com.example.crud.repository.UserRepository;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {

  @Autowired
  private OrderRepository orderRepository;

  @Autowired
  private OrderDetailRepository orderDetailRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private ProductRepository productRepository;

  @Transactional
  public void createOrder(OrderDTO orderDTO) {
    User user = userRepository
      .findById(orderDTO.getUserId())
      .orElseThrow(() -> new RuntimeException("Usuario no encontrado."));

    Order order = new Order();
    order.setUser(user);
    order.setOrderDate(new Date());
    order = orderRepository.save(order);

    double totalPrice = 0;
    for (OrderDetailDTO detail : orderDTO.getOrderDetails()) {
      Product product = productRepository
        .findById(detail.getProductId())
        .orElseThrow(() ->
          new InsufficientStockException(
            "Producto no encontrado con ID: " + detail.getProductId()
          )
        );

      if (product.getProductStock() < detail.getQuantity()) {
        throw new InsufficientStockException(
          "Stock insuficiente para el producto con ID: " + detail.getProductId()
        );
      }

      double priceForProduct = product.getProductPrice() * detail.getQuantity();
      totalPrice += priceForProduct;

      product.setProductStock(product.getProductStock() - detail.getQuantity());
      productRepository.save(product);

      OrderDetail orderDetail = new OrderDetail();
      orderDetail.setOrder(order);
      orderDetail.setProduct(product);
      orderDetail.setQuantity(detail.getQuantity());
      orderDetailRepository.save(orderDetail);
    }

    order.setTotalPrice(totalPrice);
  }

  public List<OrderResponseDTO> getOrders() {
    return orderRepository
      .findAll()
      .stream()
      .map(order -> {
        OrderResponseDTO dto = new OrderResponseDTO();
        dto.setOrderId(order.getOrderId());
        dto.setTotalPrice(order.getTotalPrice());
        dto.setOrderDate(order.getOrderDate());
        dto.setUserId(order.getUser().getUserId());

        List<OrderDetailDTO> detailsDto = order
          .getOrderDetails()
          .stream()
          .map(detail -> {
            OrderDetailDTO detailDto = new OrderDetailDTO();
            detailDto.setProductId(detail.getProduct().getProductId());
            detailDto.setQuantity(detail.getQuantity());
            detailDto.setPrice(
              detail.getProduct().getProductPrice() * detail.getQuantity()
            );
            return detailDto;
          })
          .collect(Collectors.toList());

        dto.setOrderDetails(detailsDto);
        return dto;
      })
      .collect(Collectors.toList());
  }
}
