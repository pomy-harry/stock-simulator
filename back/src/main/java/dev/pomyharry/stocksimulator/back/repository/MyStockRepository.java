package dev.pomyharry.stocksimulator.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.pomyharry.stocksimulator.back.model.entity.MyStock;

public interface MyStockRepository extends JpaRepository<MyStock, String> {
    
}
