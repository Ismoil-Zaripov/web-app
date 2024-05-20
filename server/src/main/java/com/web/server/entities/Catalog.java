package com.web.server.entities;

import com.web.server.dto.response.CatalogResponse;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "catalogs")
public class Catalog extends BaseEntity {
    private String catalogName;

    public CatalogResponse mapToResponse() {
        return new CatalogResponse(super.getId(), this.catalogName);
    }
}
