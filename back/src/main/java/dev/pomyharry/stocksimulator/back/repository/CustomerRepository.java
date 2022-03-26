package dev.pomyharry.stocksimulator.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import dev.pomyharry.stocksimulator.back.model.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer findByEmail(String email);
}
