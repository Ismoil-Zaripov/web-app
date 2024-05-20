package com.web.server.dto.request;

import com.web.server.entities.Product;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ProductRequest(
        @NotBlank(message = "Field is blank")
        String productName,
        @NotNull(message = "Field is blank")
        @Min(value = 1, message = "Field not valid")
        Integer quantity,
        @NotNull(message = "Field is blank")
        @Min(value = 1, message = "Field not valid")
        Double price,
        @NotNull(message = "Field is blank")
        Integer catalogId
) {
    public Product mapToEntity() {
        return Product.builder()
                .productName(this.productName)
                .quantity(this.quantity)
                .price(this.price)
                .catalogId(this.catalogId)
                .build();
    }
}