package dev.pomyharry.stocksimulator.back.repository;

import dev.pomyharry.stocksimulator.back.model.entity.StockData;
import dev.pomyharry.stocksimulator.back.model.entity.StockDataView;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface StockPriceDataViewRepository extends JpaRepository<StockDataView, String> {
    List<StockDataView> findAllByStockCodeAndTradeDateBetween(String code, LocalDate start, LocalDate end);

    List<StockDataView> findAllByStockCode(String code);
}

