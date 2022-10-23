package com.assignment.webt.dto;

import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component
public class PurchaseProductDTO implements Serializable {

    private String id;
    private String name;

    private String quantity;

    private double amount;

    public PurchaseProductDTO(){

    }
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}
