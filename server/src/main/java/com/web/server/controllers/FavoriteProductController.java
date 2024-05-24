package com.web.server.controllers;

import com.web.server.dto.response.ProductResponse;
import com.web.server.dto.response.Response;
import com.web.server.services.FavoriteProductService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins="*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/favorite-products")
public class FavoriteProductController {

    private final FavoriteProductService useCase;

    @PostMapping
    public Response<String> addFavoriteProduct(
            @RequestParam("product-id")
            Integer productId,
            HttpServletRequest request
    ) {
        useCase.addFavoriteProduct(productId, request.getRemoteHost());
        return Response.ok("product added");
    }

    @DeleteMapping
    public Response<String> removeFavoriteProduct(
            @RequestParam("product-id")
            Integer productId,
            HttpServletRequest request
    ) {
        useCase.removeFavoriteProduct(productId, request.getRemoteHost());
        return Response.ok("product removed");
    }

    @GetMapping
    public Response<List<ProductResponse>> favoriteProducts(
            HttpServletRequest request
    ) {
        return Response.ok(useCase.favoriteProducts(request.getRemoteHost()));
    }
}
