package com.web.server.services;

import com.web.server.dto.response.OrderResponse;
import com.web.server.dto.response.ProductResponse;

import java.util.List;

public interface OrderService {
    void makeOrder(String email, List<ProductResponse> products);
    List<OrderResponse> getAllOrders();
    List<OrderResponse> getAllOrders(String email);
}
