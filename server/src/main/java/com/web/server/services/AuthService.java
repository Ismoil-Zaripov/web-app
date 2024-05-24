package com.web.server.services;

import com.web.server.dto.request.AuthRequest;
import com.web.server.dto.request.RegisterRequest;
import com.web.server.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse login(AuthRequest request);
    AuthResponse refreshToken(String authHeader);
    void register(RegisterRequest request, String userIpAddress);
    void logout();

}
