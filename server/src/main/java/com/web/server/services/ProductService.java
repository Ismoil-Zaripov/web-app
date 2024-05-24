package com.web.server.services;

import com.web.server.dto.request.ProductRequest;
import com.web.server.dto.response.ProductResponse;

import java.util.List;

public interface ProductService extends CrudService<ProductRequest, ProductResponse> {

    List<ProductResponse> productsListByCatalog(Integer catalogId);

    List<ProductResponse> searchProduct(String sort, String query);
}