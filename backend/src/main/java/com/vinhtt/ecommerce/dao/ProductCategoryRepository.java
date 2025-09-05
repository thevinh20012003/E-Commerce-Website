package com.vinhtt.ecommerce.dao;

import com.vinhtt.ecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

// tùy chỉnh tên Json và path của endpoints
@RepositoryRestResource(
        // name of JSON entry
        collectionResourceRel = "productCategory",
        // path of the endpoint
        // product-category
        path = "product-category"
)
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
}