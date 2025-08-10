package com.vinhtt.ecommerce.dao;

import com.vinhtt.ecommerce.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource
public interface StateRepository extends JpaRepository<State, Integer> {
    // This interface will automatically provide CRUD operations for State entity
    // Additional custom queries can be defined here if needed
    List<State> findByCountryCode(@Param("code") String code);
}
