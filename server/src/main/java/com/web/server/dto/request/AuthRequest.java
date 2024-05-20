package com.web.server.dto.request;

public record AuthRequest(
        String username,
        String password
) { }
