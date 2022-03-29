package dev.pomyharry.stocksimulator.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import dev.pomyharry.stocksimulator.back.model.entity.WatchStock;

public interface WatchStockRepository extends JpaRepository<WatchStock, String> {

}
