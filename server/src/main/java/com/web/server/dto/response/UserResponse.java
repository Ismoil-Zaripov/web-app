package com.web.server.dto.response;

import lombok.Builder;

@Builder
public record UserResponse(
        Integer userId,
        String name,
        String surname,
        String email
) { }
