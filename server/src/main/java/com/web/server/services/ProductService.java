package com.web.server.services;

import com.web.server.dto.request.ProductRequest;
import com.web.server.dto.response.ProductResponse;
import com.web.server.entities.Product;
import com.web.server.repositories.ProductRepository;
import com.web.server.usecases.ProductUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService implements ProductUseCase {

    private final ProductRepository repository;

    @Override
    public void create(ProductRequest productRequest) {
        Optional<Product> optionalProduct = repository.findByProductName(productRequest.productName());

        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();

            product.setQuantity(product.getQuantity() + productRequest.quantity());
            product.setPrice(productRequest.price());

            repository.save(product);
        }

        if (optionalProduct.isEmpty()) {
            repository.save(productRequest.mapToEntity());
        }
    }

    @Override
    public void update(Integer productId, ProductRequest productRequest) {
        Optional<Product> optionalProduct = repository.findById(productId);
        if (optionalProduct.isEmpty()) throw new RuntimeException("Product not found...");

        Product product = optionalProduct.get();
        product.setProductName(productRequest.productName());
        product.setQuantity(productRequest.quantity());
        product.setPrice(productRequest.price());

        repository.save(product);
    }

    @Override
    public void delete(Integer productId) {
        repository.deleteById(productId);
    }

    @Override
    public List<ProductResponse> getAll() {
        return repository
                .findAll()
                .stream()
                .map(Product::mapToResponse)
                .toList();
    }

    @Override
    public List<ProductResponse> productsListByCatalog(Integer catalogId) {
        return repository
                .findAll()
                .stream()
                .map(Product::mapToResponse)
                .toList();
    }

    @Override
    public List<ProductResponse> searchProduct(String sort, String query) {

        try {

        return switch (sort) {
            case "new_products" -> repository
                    .searchAllByProductName(query, Sort.by(Sort.Direction.DESC, "createdDate"))
                    .stream()
                    .map(Product::mapToResponse)
                    .toList();
            case "low_price" -> repository
                    .searchAllByProductName(query, Sort.by(Sort.Direction.ASC, "price"))
                    .stream()
                    .map(Product::mapToResponse)
                    .toList();
            case "high_price" -> repository
                    .searchAllByProductName(query, Sort.by(Sort.Direction.DESC, "price"))
                    .stream()
                    .map(Product::mapToResponse)
                    .toList();
            default -> repository.findAll().stream().map(Product::mapToResponse).toList();
        };
        }
        catch (Exception ex) {
            ex.printStackTrace();
            return Collections.emptyList();
        }
    }
}
