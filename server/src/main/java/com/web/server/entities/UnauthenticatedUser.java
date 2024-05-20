package com.web.server.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "unauthenticated_users")
public class UnauthenticatedUser extends BaseEntity {
    private String userIpAddress;
    private boolean isAuthenticatedUser;
}
