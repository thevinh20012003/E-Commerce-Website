package com.vinhtt.ecommerce.config;

import com.vinhtt.ecommerce.entity.Product;
import com.vinhtt.ecommerce.entity.ProductCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] theUnsupportedActions = {
            HttpMethod.POST,
            HttpMethod.PUT,
            HttpMethod.PATCH,
            HttpMethod.DELETE
        };
        // Disable HTTP methods for Product: POST, PUT, PATCH, DELETE
        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure((metadata, httpMethods1) -> httpMethods1.disable(theUnsupportedActions))
                .withCollectionExposure((metadata, httpMethods1) -> httpMethods1.disable(theUnsupportedActions));
        // Disable HTTP methods for ProductCategory: POST, PUT, PATCH, DELETE
        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure((metadata, httpMethods1) -> httpMethods1.disable(theUnsupportedActions))
                .withCollectionExposure((metadata, httpMethods1) -> httpMethods1.disable(theUnsupportedActions));

    }
}
