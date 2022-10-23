package com.assignment.webt.model;

import com.assignment.webt.dto.PurchaseProductDTO;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.List;

@Document("webt-purchase")
public class Purchase implements Serializable {

    @Id
    private String id;

    private String email;

    private String name;

    private double totalAmount;

    private List<PurchaseProductDTO> products;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public List<PurchaseProductDTO> getProducts() {
        return products;
    }

    public void setProducts(List<PurchaseProductDTO> products) {
        this.products = products;
    }
}