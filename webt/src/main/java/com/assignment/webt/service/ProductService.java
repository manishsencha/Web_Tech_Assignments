package com.assignment.webt.service;

import com.assignment.webt.dto.AddProductDTO;
import com.assignment.webt.model.Product;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface ProductService {

    List<Product> getAllProducts();
    AddProductDTO addProduct(Product product);

}
