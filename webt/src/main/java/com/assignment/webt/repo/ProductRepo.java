package com.assignment.webt.repo;


import com.assignment.webt.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface ProductRepo extends MongoRepository<Product, String> {

    @Query("{name : '?0'}")
    Product findProductByName(String name);

    List<Product> findAll();
}
