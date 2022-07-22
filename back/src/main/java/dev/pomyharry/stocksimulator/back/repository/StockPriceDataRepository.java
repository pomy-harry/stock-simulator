package dev.pomyharry.stocksimulator.back.repository;

import dev.pomyharry.stocksimulator.back.model.entity.StockData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface StockPriceDataRepository extends JpaRepository<StockData, String> {
    List<StockData> findAllByStockCodeAndTradeDateBetween(String code, LocalDate start, LocalDate end);

    List<StockData> findAllByStockCode(String code);
}
