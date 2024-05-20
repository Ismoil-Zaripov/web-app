package com.web.server.repositories;

import com.web.server.entities.UnauthenticatedUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UnauthenticatedUserRepository
        extends JpaRepository<UnauthenticatedUser, String> {

    Optional<UnauthenticatedUser> findByUserIpAddress(String ipAddress);
}
