package com.example.auth_service.Repository;

import com.example.auth_service.Entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepo extends JpaRepository<Product,Long> {


}
