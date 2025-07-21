package com.vinhtt.ecommerce.dao;

import com.vinhtt.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200") // Allow CORS for Angular frontend
public interface ProductRepository extends JpaRepository<Product, Long> {
}
