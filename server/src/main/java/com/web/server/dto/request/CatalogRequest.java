package com.web.server.dto.request;

import com.web.server.entities.Catalog;
import jakarta.validation.constraints.NotBlank;

public record CatalogRequest(
        @NotBlank(message = "Field is blank")
        String catalogName
) {
    public Catalog mapToEntity() {
        return Catalog.builder()
                .catalogName(this.catalogName)
                .build();
    }
}