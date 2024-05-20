package com.web.server;

import com.web.server.entities.User;
import com.web.server.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@SpringBootApplication
@RequiredArgsConstructor
public class ServerApplication {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }

    @PostConstruct
    void initData() {

        if (userRepository.findAll().isEmpty()) {
            User admin = User.builder()
                    .name("Admin")
                    .surname("Admin")
                    .email("admin@gmail.com")
                    .password(passwordEncoder.encode("admin"))
                    .role("ADMIN")
                    .build();

            User user = User.builder()
                    .name("User")
                    .surname("User")
                    .email("user@gmail.com")
                    .password(passwordEncoder.encode("user"))
                    .role("USER")
                    .build();

            userRepository.saveAll(List.of(user, admin));
        }
    }

}
