package com.web.server.services;

import com.web.server.dto.response.ProductResponse;

import java.util.List;

public interface FavoriteProductService {
    void addFavoriteProduct(Integer productId, String userIpAddress);
    void removeFavoriteProduct(Integer productId, String userIpAddress);
    List<ProductResponse> favoriteProducts(String userIpAddress);
}
