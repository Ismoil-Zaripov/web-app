package com.web.server.services;

import com.web.server.dto.response.ProductResponse;
import com.web.server.entities.FavoriteProduct;
import com.web.server.entities.Product;
import com.web.server.entities.UnauthenticatedUser;
import com.web.server.exception.BadRequestException;
import com.web.server.repositories.FavoriteProductRepository;
import com.web.server.repositories.ProductRepository;
import com.web.server.repositories.UnauthenticatedUserRepository;
import com.web.server.usecases.FavoriteProductUseCase;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class FavoriteProductService implements FavoriteProductUseCase {

    private final FavoriteProductRepository favoriteProductRepository;
    private final ProductRepository productRepository;
    private final UnauthenticatedUserRepository unauthenticatedUserRepository;

    @Override
    public void addFavoriteProduct(Integer productId, String userIpAddress) {

        Optional<FavoriteProduct> optionalFavoriteProduct = favoriteProductRepository.findByProductId(productId);
        if (optionalFavoriteProduct.isEmpty()) {

            Optional<Product> optionalProduct = productRepository.findById(productId);

            if (optionalProduct.isEmpty()) {
                throw new BadRequestException("Product not found...");
            }

            Product product = optionalProduct.get();

            FavoriteProduct favoriteProduct = FavoriteProduct.builder()
                    .userIpAddress(userIpAddress)
                    .productId(product.getId())
                    .build();

            favoriteProductRepository.save(favoriteProduct);

        }
    }

    @Override
    public void removeFavoriteProduct(Integer productId, String userIpAddress) {
        Optional<UnauthenticatedUser> optionalUnauthenticatedUser = unauthenticatedUserRepository
                .findByUserIpAddress(userIpAddress);

        if (optionalUnauthenticatedUser.isEmpty()) {
            unauthenticatedUserRepository.save(
                    UnauthenticatedUser.builder()
                            .isAuthenticatedUser(false)
                            .userIpAddress(userIpAddress)
                            .build()
            );
        }

        favoriteProductRepository
                .deleteByUserIpAddressAndProductId(userIpAddress, productId);
    }

    @Override
    public List<ProductResponse> favoriteProducts(String userIpAddress) {
        try {

            return favoriteProductRepository
                    .findAllByUserIpAddress(userIpAddress)
                    .stream()
                    .map(favoriteProduct -> favoriteProduct.getProduct().mapToResponse())
                    .toList();
        } catch (Exception ex) {
            ex.printStackTrace();
            return Collections.emptyList();
        }
    }
}
