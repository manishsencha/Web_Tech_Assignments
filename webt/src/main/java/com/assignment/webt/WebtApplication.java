package com.assignment.webt;

import com.assignment.webt.model.Product;
import com.assignment.webt.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.ArrayList;
import java.util.List;


@SpringBootApplication
public class WebtApplication implements CommandLineRunner{
	@Autowired
	private ProductRepo productRepo;
	@Override
	public  void run(String... args) throws Exception {
		productRepo.deleteAll();
		List<Product> products = new ArrayList<>();
		products.add(new Product("Product 1", 1));
		products.add(new Product("Product 2", 3));
		products.add(new Product("Product 3", 4.55));
		products.add(new Product("Product 4", 4.33));
		products.add(new Product("Product 5", 1.44));
		products.add(new Product("Product 6", 3.445));
		products.add(new Product("Product 7", 5.57));
		products.add(new Product("Product 8", 6));
		products.add(new Product("Product 9", 7.90));
		products.add(new Product("Product 10", 10.90));
		products.add(new Product("Product 11", 11.32));
		products.add(new Product("Product 12", 12.2));
		for(Product product : products) {
			System.out.println("Adding " + product.getName());
			productRepo.save(product);
		}
	}
	public static void main(String[] args) {
		SpringApplication.run(WebtApplication.class, args);
	}
}
