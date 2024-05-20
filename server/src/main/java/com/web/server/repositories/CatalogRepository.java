package com.web.server.repositories;

import com.web.server.entities.Catalog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CatalogRepository extends JpaRepository<Catalog,Integer> {
    Optional<Catalog> findByCatalogName(String catalogName);
}