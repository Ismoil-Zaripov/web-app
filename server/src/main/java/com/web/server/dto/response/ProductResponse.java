package com.web.server.dto.response;

import lombok.Builder;

@Builder
public record ProductResponse(
        Integer productId,
        String productName,
        Integer quantity,
        Double price,
        CatalogResponse catalog
) { }