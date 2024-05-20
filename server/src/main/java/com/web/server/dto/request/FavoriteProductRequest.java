package com.web.server.dto.request;

import jakarta.validation.constraints.NotNull;

public record FavoriteProductRequest(
        @NotNull(message = "Field not valid")
        Integer productId
) { }