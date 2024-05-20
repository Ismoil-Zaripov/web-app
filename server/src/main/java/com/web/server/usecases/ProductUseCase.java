package com.web.server.usecases;

import com.web.server.dto.request.ProductRequest;
import com.web.server.dto.response.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductUseCase extends CrudUseCase<ProductRequest, ProductResponse> {

    List<ProductResponse> productsListByCatalog(Integer catalogId);

    List<ProductResponse> searchProduct(String sort, String query);
}