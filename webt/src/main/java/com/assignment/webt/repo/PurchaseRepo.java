package com.assignment.webt.repo;

import com.assignment.webt.model.Purchase;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchaseRepo extends MongoRepository<Purchase, String> {

    @Query(value = "{email : '?0'}")
    List<Purchase> findByEmail(String email);
    List<Purchase> findAll();

}
