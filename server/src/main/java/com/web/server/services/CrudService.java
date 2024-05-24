package com.web.server.services;

import java.util.List;

public interface CrudService<REQUEST, RESPONSE> {
    void create(REQUEST request);
    void update(Integer Id, REQUEST request);
    void delete(Integer Id);
    List<RESPONSE> getAll();
}
