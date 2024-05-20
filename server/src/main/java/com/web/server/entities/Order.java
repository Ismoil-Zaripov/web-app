package com.web.server.entities;

import com.web.server.dto.response.OrderResponse;
import com.web.server.dto.response.ProductResponse;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "catalogs")
public class Order extends BaseEntity {

    @Column(name = "user_id")
    private Integer userId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",updatable = false, insertable = false)
    private User user;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "order_products",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private Set<Product> products;

    public OrderResponse mapToResponse() {

        List<ProductResponse> productResponses = products.stream().map(Product::mapToResponse).toList();

        return new OrderResponse(user == null ? null : user.mapToResponse(), productResponses);
    }
}


