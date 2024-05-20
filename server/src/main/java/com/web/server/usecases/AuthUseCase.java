package com.web.server.usecases;

import com.web.server.dto.request.AuthRequest;
import com.web.server.dto.request.RegisterRequest;
import com.web.server.dto.response.AuthResponse;
import jakarta.servlet.http.HttpServletRequest;

public interface AuthUseCase {
    AuthResponse login(AuthRequest request);
    AuthResponse refreshToken(String authHeader);
    void register(RegisterRequest request, String userIpAddress);
    void logout();

}
