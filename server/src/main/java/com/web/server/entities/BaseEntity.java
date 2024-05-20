package com.web.server.entities;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Getter
@MappedSuperclass
public class BaseEntity {
    @Id
    @GeneratedValue
    private Integer id;

    @UpdateTimestamp
    private LocalDateTime updatedDate;

    @CreationTimestamp
    private LocalDateTime createdDate;
}
