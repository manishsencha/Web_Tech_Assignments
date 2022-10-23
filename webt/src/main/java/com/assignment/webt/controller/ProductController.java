package com.assignment.webt.controller;

import com.assignment.webt.dto.AddProductDTO;
import com.assignment.webt.model.Product;
import com.assignment.webt.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@CrossOrigin
@RequestMapping("/api")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping(value = "/allProducts", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<List<Product>> getAllProducts() {
        try{
            List<Product> products = productService.getAllProducts();
            return new ResponseEntity<>(products, HttpStatus.OK);
        }
       catch (Exception e) {
            List<Product> products = new ArrayList<>();
            return new ResponseEntity<>(products, HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }

    @PostMapping(value = "/addProduct", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<AddProductDTO> addProduct(@RequestBody Product product) {
        try {
            AddProductDTO addProductDTO = productService.addProduct(product);
            return new ResponseEntity<>(addProductDTO, HttpStatus.CREATED);
        }
        catch(Exception e) {
            AddProductDTO addProductDTO = new AddProductDTO();
            addProductDTO.setName(product.getName());
            addProductDTO.setPrice(product.getPrice());
            addProductDTO.setMessage("Failed to add product");
            return new ResponseEntity<>(addProductDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}