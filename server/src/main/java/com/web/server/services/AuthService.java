package com.web.server.services;

import com.web.server.dto.request.AuthRequest;
import com.web.server.dto.request.RegisterRequest;
import com.web.server.dto.response.AuthResponse;
import com.web.server.entities.User;
import com.web.server.repositories.UserRepository;
import com.web.server.usecases.AuthUseCase;
import com.web.server.usecases.JwtUseCase;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService implements AuthUseCase {

    private final JwtUseCase jwtUseCase;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthResponse login(AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.username(),
                        request.password()
                )
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        return new AuthResponse(
                jwtUseCase.generateAccessToken(userDetails),
                jwtUseCase.generateRefreshToken(userDetails)
        );
    }

    @Override
    public AuthResponse refreshToken(String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }

        final String refreshToken = authHeader.substring(7);

        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        if (jwtUseCase.isTokenValid(refreshToken, userDetails)) {
            return new AuthResponse(
                    jwtUseCase.generateAccessToken(userDetails),
                    jwtUseCase.generateRefreshToken(userDetails)
            );
        }
        return null;
    }

    @Override
    public void register(RegisterRequest request, String userIpAddress) {
        Optional<User> optionalUser = userRepository.findByEmail(request.email());
        if (optionalUser.isEmpty()) {
            userRepository.save(User.builder()
                    .name(request.name())
                    .surname(request.surname())
                    .email(request.email())
                    .password(passwordEncoder.encode(request.password()))
                    .ipAddress(userIpAddress)
                    .role("USER")
                    .build());
        }
    }

    @Override
    public void logout() {
        SecurityContextHolder.clearContext();
    }
}
