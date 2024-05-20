package com.web.server.dto.response;

import java.util.List;

public record FavoriteProductResponse(
        Integer id,
        String userIpAddress,
        List<ProductResponse> products
) { }
