package com.vinhtt.ecommerce.config;

import com.vinhtt.ecommerce.entity.Product;
import com.vinhtt.ecommerce.entity.ProductCategory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    // Get a list of entities to expose their IDs in the response
    private EntityManager entityManager;

    @Autowired
    public MyDataRestConfig(EntityManager theEntityManager) {
        entityManager = theEntityManager;
    }


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

        // call an internal helper to expose IDs
        exposeIds(config);
    }
    private void exposeIds(RepositoryRestConfiguration config) {
        // Expose entity ids for Product
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        // create an array of the entity classes
        List<Class<?>> entityClasses = new ArrayList<>();

        // get the entity types for the entities
        for (EntityType<?> entity : entities) {
            entityClasses.add(entity.getJavaType());
        }

        // convert the list to an array and expose the IDs
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }
}
