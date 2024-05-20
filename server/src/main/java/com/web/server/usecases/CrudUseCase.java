package com.web.server.usecases;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CrudUseCase <REQUEST, RESPONSE> {
    void create(REQUEST request);
    void update(Integer Id, REQUEST request);
    void delete(Integer Id);
    List<RESPONSE> getAll();
}
