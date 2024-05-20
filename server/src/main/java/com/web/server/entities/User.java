package com.web.server.entities;

import com.web.server.dto.response.UserResponse;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User extends BaseEntity {
    private String name;
    private String surname;
    private String email;
    private String password;
    private String ipAddress;
    private String role;

    public UserResponse mapToResponse() {
        return UserResponse.builder()
                .userId(super.getId())
                .name(this.name)
                .surname(this.surname)
                .email(this.email)
                .build();
    }
}
