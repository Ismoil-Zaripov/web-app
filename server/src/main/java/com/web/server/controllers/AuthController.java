package com.web.server.controllers;

import com.web.server.dto.request.AuthRequest;
import com.web.server.dto.request.RegisterRequest;
import com.web.server.dto.response.AuthResponse;
import com.web.server.dto.response.Response;
import com.web.server.usecases.AuthUseCase;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins="*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthUseCase authUseCase;

    @PostMapping("/login")
    public Response<AuthResponse> login(@RequestBody @Valid AuthRequest request){
        return Response.ok(authUseCase.login(request));
    }

    @PostMapping("/register")
    public Response<String> register(
            @RequestBody @Valid
            RegisterRequest registerRequest,
            HttpServletRequest servletRequest
    ) {
        authUseCase.register(registerRequest, servletRequest.getRemoteUser());
        return Response.ok("Successfully registered !");
    }

    @GetMapping("/logout")
    public Response<?> logout() {
        authUseCase.logout();
        return null;
    }

    @PostMapping("/refresh-token")
    public Response<AuthResponse> refreshToken(@RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {
        return Response.ok(authUseCase.refreshToken(authHeader));
    }
}
