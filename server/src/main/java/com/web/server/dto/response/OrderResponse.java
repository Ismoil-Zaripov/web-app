package com.web.server.dto.response;

import java.util.List;

public record OrderResponse(
        UserResponse user,
        List<ProductResponse> products
) {
}
