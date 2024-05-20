package com.web.server.usecases;

import org.springframework.security.core.userdetails.UserDetails;

public interface JwtUseCase {
    String extractUsername(String token);
    boolean isTokenValid(String token, UserDetails userDetails);
    String generateAccessToken(UserDetails userDetails);
    String generateRefreshToken(UserDetails userDetails);
}
