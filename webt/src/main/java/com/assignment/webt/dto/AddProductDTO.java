package com.assignment.webt.dto;

import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component
public class AddProductDTO implements Serializable {

    private double price;

    private String name;

    private String message;

    public AddProductDTO() {

    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


}
