package com.vinhtt.ecommerce.dao;

import com.vinhtt.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.awt.print.Pageable;

@CrossOrigin("http://localhost:4200") // Allow CORS for Angular frontend
public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);
}
