package com.assignment.webt.service.serviceimpl;


import com.assignment.webt.dto.AddProductDTO;
import com.assignment.webt.model.Product;
import com.assignment.webt.repo.ProductRepo;
import com.assignment.webt.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepo productRepo;

    @Override
    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    @Override
    public AddProductDTO addProduct(Product product) {
        productRepo.save(product);
        AddProductDTO addProductDTO = new AddProductDTO();
        addProductDTO.setName(product.getName());
        addProductDTO.setPrice(product.getPrice());
        addProductDTO.setMessage("Added Product");
        return addProductDTO;
    }
}