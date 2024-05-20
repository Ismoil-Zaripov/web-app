package com.web.server.dto.response;

public record AuthResponse(
        String accessToken,
        String refreshToken
) {
}
