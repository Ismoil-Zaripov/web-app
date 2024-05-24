package com.web.server.controllers;

import com.web.server.dto.response.OrderResponse;
import com.web.server.dto.response.ProductResponse;
import com.web.server.dto.response.Response;
import com.web.server.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins="*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService useCase;

//    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PostMapping("/make-order/{email}")
    public Response<String> makeOrder(
            @PathVariable String email,
            @RequestBody List<ProductResponse> products
    ) {
        useCase.makeOrder(email, products);
        return Response.ok("Products ordered !");
    }

//    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public Response<List<OrderResponse>> getAllOrders() {
        return Response.ok(useCase.getAllOrders());
    }

//    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/{email}")
    public Response<List<OrderResponse>> getAllOrders(@PathVariable String email) {
        return Response.ok(useCase.getAllOrders(email));
    }
}
