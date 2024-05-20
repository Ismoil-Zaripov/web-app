package com.web.server.repositories;

import com.web.server.entities.FavoriteProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteProductRepository
        extends JpaRepository<FavoriteProduct, Integer> {
    void deleteByUserIpAddressAndProductId(String userIpAddress, Integer productId);

    Optional<FavoriteProduct> findByProductId(Integer productId);
    List<FavoriteProduct> findAllByUserIpAddress(String ipAddress);
}
