package com.assignment.webt.dto;

import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component
public class PurchaseResponseDTO implements Serializable {

    private String email;

    private String name;

    private double totalBill;

    public PurchaseResponseDTO() {

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

    public double getTotalBill() {
        return totalBill;
    }

    public void setTotalBill(double totalBill) {
        this.totalBill = totalBill;
    }
}
