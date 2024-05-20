package com.web.server.dto.request;

import jakarta.validation.constraints.NotBlank;

public record RegisterRequest(
        @NotBlank(message = "Field name is blank")
        String name,
        @NotBlank(message = "Field surname is blank")
        String surname,
        @NotBlank(message = "Field email is blank")
        String email,
        @NotBlank(message = "Field password is blank")
        String password
) { }
