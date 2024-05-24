package com.web.server.services.impl;

import com.web.server.dto.response.OrderResponse;
import com.web.server.dto.response.ProductResponse;
import com.web.server.entities.Order;
import com.web.server.entities.Product;
import com.web.server.entities.User;
import com.web.server.repositories.OrderRepository;
import com.web.server.repositories.ProductRepository;
import com.web.server.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderServiceImpl implements com.web.server.services.OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Override
    public void makeOrder(String email, List<ProductResponse> products) {
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isPresent()) {

            User user = optionalUser.get();

            List<Integer> ids = products.stream()
                    .map(ProductResponse::productId)
                    .toList();

            Set<Product> productEntityList = new HashSet<>(productRepository.findAllById(ids));

            Order order = Order.builder()
                    .userId(user.getId())
                    .user(user)
                    .products(productEntityList)
                    .build();

            orderRepository.save(order);
        }
    }

    @Override
    public List<OrderResponse> getAllOrders() {
        try {

            List<OrderResponse> orderResponseList = orderRepository
                    .findAll()
                    .stream()
                    .map(Order::mapToResponse)
                    .toList();

            return orderResponseList;

        } catch (Exception ex) {
            ex.printStackTrace();
            return Collections.emptyList();
        }
    }

    @Override
    public List<OrderResponse> getAllOrders(String email) {
        try {

            Optional<User> optionalUser = userRepository.findByEmail(email);

            if (optionalUser.isPresent()) {

                Integer userId = optionalUser.get().getId();

                return orderRepository
                        .findAllByUserId(userId)
                        .stream()
                        .map(Order::mapToResponse)
                        .toList();

            } else return Collections.emptyList();
        } catch (Exception ex) {
            ex.printStackTrace();
            return Collections.emptyList();
        }

    }
}
