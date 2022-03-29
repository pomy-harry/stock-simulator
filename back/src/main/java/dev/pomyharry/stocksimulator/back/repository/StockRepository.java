package dev.pomyharry.stocksimulator.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

import dev.pomyharry.stocksimulator.back.model.entity.Stock;

public interface StockRepository extends JpaRepository<Stock, String> {
    List<Stock> findAll();
}
