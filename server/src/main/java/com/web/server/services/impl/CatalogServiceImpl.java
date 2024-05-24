package com.web.server.services.impl;

import com.web.server.dto.request.CatalogRequest;
import com.web.server.dto.response.CatalogResponse;
import com.web.server.entities.Catalog;
import com.web.server.exception.BadRequestException;
import com.web.server.exception.NotFoundException;
import com.web.server.repositories.CatalogRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CatalogServiceImpl implements com.web.server.services.CatalogService {

    private final CatalogRepository repository;

    @Override
    public void create(CatalogRequest request) {

        Optional<Catalog> optionalCatalog = repository.findByCatalogName(request.catalogName());

        if (optionalCatalog.isPresent()) {
            throw new BadRequestException("Catalog exists");
        } else {
            repository.save(request.mapToEntity());
        }

    }

    @Override
    public void update(Integer catalogId, CatalogRequest request) {

        Optional<Catalog> optionalCatalog = repository.findById(catalogId);
        if (optionalCatalog.isEmpty()) throw new NotFoundException("Catalog not found");

        boolean catalogExist = repository
                .findByCatalogName(request.catalogName())
                .isPresent();

        if (catalogExist) {
            throw new BadRequestException("Catalog name exists, enter other name...");
        } else {
            Catalog catalog = optionalCatalog.get();
            catalog.setCatalogName(request.catalogName());

            repository.save(catalog);
        }

    }

    @Override
    public void delete(Integer catalogId) {
        try {
            repository.deleteById(catalogId);
        } catch (Exception ex) {
ex.printStackTrace();
        }
    }

    @Override
    public List<CatalogResponse> getAll() {
        return repository.findAll()
                .stream()
                .map(Catalog::mapToResponse)
                .toList();
    }
}
