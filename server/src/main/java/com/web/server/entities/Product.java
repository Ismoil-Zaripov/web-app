package com.web.server.entities;

import com.web.server.dto.response.ProductResponse;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "products")
public class Product extends BaseEntity {
    private String productName;
    private Integer quantity;
    private Double price;
    @Column(name = "catalog_id")
    private Integer catalogId;
    @ManyToOne
    @JoinColumn(name = "catalog_id", insertable = false, updatable = false)
    private Catalog catalog;

    public ProductResponse mapToResponse() {
        return ProductResponse.builder()
                .productId(super.getId())
                .productName(this.productName)
                .quantity(this.quantity)
                .price(this.price)
                .catalog(catalog.mapToResponse())
                .build();
    }

}
