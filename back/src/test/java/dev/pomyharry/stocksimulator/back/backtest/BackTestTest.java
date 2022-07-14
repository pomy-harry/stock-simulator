package dev.pomyharry.stocksimulator.back.backtest;

import dev.pomyharry.stocksimulator.back.model.entity.StockData;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@Slf4j
@SpringBootTest
public class BackTestTest {

    @Autowired
    private BackTestService service;

    @Test
    void getStockByCodeAndDate(){
        service.getStocksByCodeAndPeriod("005930", 2019, 2021);
    }
}
