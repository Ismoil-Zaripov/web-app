package com.web.server.entities;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "favorite_products")
public class FavoriteProduct extends BaseEntity {

    private String userIpAddress;

    @ManyToOne
    @JoinColumn(updatable = false, insertable = false)
    private UnauthenticatedUser user;

    @Column(name = "product_id")
    private Integer productId;

    @OneToOne
    @JoinColumn(name = "product_id", insertable = false, updatable = false)
    private Product product;

}
