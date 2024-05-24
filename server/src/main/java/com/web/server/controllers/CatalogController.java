package com.web.server.controllers;

import com.web.server.dto.request.CatalogRequest;
import com.web.server.dto.response.CatalogResponse;
import com.web.server.dto.response.Response;
import com.web.server.services.CatalogService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins="*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/catalogs")
public class CatalogController {

    private final CatalogService useCase;

//    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Response<String> createCatalog(
            @RequestBody
            @Valid CatalogRequest request
    ) {
        useCase.create(request);
        return Response.ok("Catalog created !");
    }

//    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{catalogId}")
    public Response<String> updateCatalog(
            @PathVariable Integer catalogId,
            @RequestBody
            @Valid CatalogRequest request
    ) {
        useCase.update(catalogId, request);
        return Response.ok("Catalog updated !");
    }

//    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{catalogId}")
    public Response<String> deleteCatalog(@PathVariable Integer catalogId) {
        useCase.delete(catalogId);
        return Response.ok("Catalog deleted !");
    }

    @GetMapping
    public Response<List<CatalogResponse>> catalogsList() {
        return Response.ok(useCase.getAll());
    }
}
