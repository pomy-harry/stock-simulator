package dev.pomyharry.stocksimulator.back.backtest;

import dev.pomyharry.stocksimulator.back.model.entity.StockData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface StockPriceDataRepository extends JpaRepository<StockData, String> {
    //List<StockData> findAllByStockCodeAndTradeDateBetween(String code, Date start, Date end);

    List<StockData> findAllByStockCode(String code);
}
