package dev.pomyharry.stocksimulator.back.backtest;

import dev.pomyharry.stocksimulator.back.model.dto.backtest.Profit;
import dev.pomyharry.stocksimulator.back.model.entity.StockData;
import dev.pomyharry.stocksimulator.back.service.BackTestService;
import dev.pomyharry.stocksimulator.back.service.BackTestServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
public class BackTestTest {
    private BackTestService service = new BackTestServiceImpl();

    @Test
    void getStockByCodeAndDate(){
        List<StockData> stocks = service.getStocksByCodeAndPeriod("005930", 2022, 2022);
        log.debug(stocks.get(0).toString());
    }

    @Test
    void getCAGR(){
        assertEquals(service.getCAGR(6500, 13200, 5), 15.2);
    }

//    @Test
//    void getProfitRate(){
//        assertEquals(service.getProfitRate(2022, 2, 120000, 80000), Profit.builder().date(new Date(2022, 2, 1)).rate(50.0).build());
//    }

//    @Test
//    void getStdev(){
//        List<Profit> profits = new ArrayList<>();
//        profits.add(new Profit(new Date(2015, 1, 1), 12));
//        profits.add(new Profit(new Date(2016, 1, 1), -6));
//        profits.add(new Profit(new Date(2017, 1, 1), 4));
//        profits.add(new Profit(new Date(2018, 1, 1), 18));
//        profits.add(new Profit(new Date(2019, 1, 1), 0));
//        profits.add(new Profit(new Date(2020, 1, 1), 8));
//
//        assertEquals(service.getStdev(profits), 7.8);
//    }
//
//    @Test
//    void getBestYear(){
//        List<Profit> profits = new ArrayList<>();
//        profits.add(new Profit(new Date(2015, 1, 1), 12));
//        profits.add(new Profit(new Date(2016, 1, 1), -6));
//        profits.add(new Profit(new Date(2017, 1, 1), 4));
//        profits.add(new Profit(new Date(2018, 1, 1), 18));
//        profits.add(new Profit(new Date(2019, 1, 1), 0));
//        profits.add(new Profit(new Date(2020, 1, 1), 8));
//
//        assertEquals(service.getBestYear(profits), 2018);
//    }
//
//    @Test
//    void getWorstYear(){
//        List<Profit> profits = new ArrayList<>();
//        profits.add(new Profit(new Date(2015, 1, 1), 12));
//        profits.add(new Profit(new Date(2016, 1, 1), -6));
//        profits.add(new Profit(new Date(2017, 1, 1), 4));
//        profits.add(new Profit(new Date(2018, 1, 1), 18));
//        profits.add(new Profit(new Date(2019, 1, 1), 0));
//        profits.add(new Profit(new Date(2020, 1, 1), 8));
//
//        assertEquals(service.getWorstYear(profits), 2016);
//    }
}
