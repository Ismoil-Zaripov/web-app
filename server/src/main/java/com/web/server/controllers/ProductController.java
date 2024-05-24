package com.web.server.controllers;

import com.web.server.dto.request.ProductRequest;
import com.web.server.dto.response.ProductResponse;
import com.web.server.dto.response.Response;
import com.web.server.services.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins="*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService useCase;
    
//    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Response<String> create(
            @RequestBody
            @Valid ProductRequest productRequest
    ) {
        useCase.create(productRequest);
        return Response.ok("Product created");
    }


//    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{productId}")
    public Response<String> update(
            @PathVariable Integer productId,
            @RequestBody
            @Valid ProductRequest productRequest
    ) {
        useCase.update(productId, productRequest);
        return Response.ok("Product updated");
    }

//    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{productId}")
    public Response<String> delete(@PathVariable Integer productId) {
        useCase.delete(productId);
        return Response.ok("Product deleted");
    }

    @GetMapping
    public Response<List<ProductResponse>> getAll() {
        return Response.ok(useCase.getAll());
    }

    @GetMapping("/get-by-catalog/{catalogId}")
    public Response<List<ProductResponse>> productsListByCatalog(
            @PathVariable Integer catalogId
    ) {
        return Response.ok(useCase.productsListByCatalog(catalogId));
    }


    @GetMapping("/search")
    public Response<List<ProductResponse>> searchProduct(
            @RequestParam("sort") String sort,
            @RequestParam("query") String query
    ) {
        return Response.ok(useCase.searchProduct(sort, query));
    }
}
