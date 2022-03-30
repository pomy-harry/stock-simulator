package dev.pomyharry.stocksimulator.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import dev.pomyharry.stocksimulator.back.model.entity.WatchStock;
import dev.pomyharry.stocksimulator.back.model.entity.Stock;
import dev.pomyharry.stocksimulator.back.model.entity.Customer;

public interface WatchStockRepository extends JpaRepository<WatchStock, String> {
    WatchStock findByStockAndCustomer(Stock stock, Customer customer);
    List<WatchStock> findAllByCustomerId(String customerId);
}
