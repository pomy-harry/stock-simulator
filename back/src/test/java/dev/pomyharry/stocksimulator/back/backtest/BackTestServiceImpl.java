package dev.pomyharry.stocksimulator.back.backtest;

import dev.pomyharry.stocksimulator.back.model.dto.backtest.BackTestDTO;
import dev.pomyharry.stocksimulator.back.model.dto.backtest.Balance;
import dev.pomyharry.stocksimulator.back.model.dto.backtest.Fall;
import dev.pomyharry.stocksimulator.back.model.dto.backtest.Profit;
import dev.pomyharry.stocksimulator.back.model.dto.portfolio.PortfolioDTO;
import dev.pomyharry.stocksimulator.back.model.entity.StockData;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Slf4j
@Service
public class BackTestServiceImpl implements BackTestService{

    @Autowired
    StockPriceDataRepository stockPriceDataRepository;

    @Override
    public BackTestDTO getBackTestResult(PortfolioDTO portfolio){

        long startMoney = portfolio.getDeposit();
        long endMoney = 0;
        double cagr = getCAGR(startMoney, endMoney, portfolio.getEndYear() - portfolio.getStartYear());
        double stdev;
        int bestYear;
        int worstYear;
        double mdd;
        List<Balance> balances;
        List<Fall> falls;
        List<Profit> profits;


        return null;
    }

    @Override
    public List<StockData> getStocksByCodeAndPeriod(String code, int startYear, int endYear){

        List<StockData> stocks = stockPriceDataRepository.findAllByStockCode("005930");
        log.debug(stocks.get(0).toString());

        return null;
    }

    @Override
    public double getCAGR(long startPrice, long endPrice, int years){

        double cagr = Math.pow((endPrice / startPrice), 1 / years) - 1;

        return cagr;
    }

    @Override
    public PortfolioDTO rebalancePortfolio(PortfolioDTO portfolio){
        return null;
    }

    @Override
    public Profit getProfitRate(int year, int month, int nowPrice, int boughtPrice){

        double rate = (nowPrice - boughtPrice) / boughtPrice;

        return Profit.builder().date(new Date(year, month, 1)).rate(rate).build();
    }

    @Override
    public Fall getFalls(List<StockData> stocks){

        int high = 0;
        int low = Integer.MAX_VALUE;

         for(StockData stock : stocks){
             int last = stock.getLastPrice();

             high = high < last ? last : high;
             low = low > last ? last : low;
         }

         double rate = (high - low) / high * 100;

        return Fall.builder()
                .year(stocks.get(0).getDate().getYear())
                .month(stocks.get(0).getDate().getMonth())
                .high(high)
                .low(low)
                .fall(rate)
                .build();
    }

    @Override
    public Balance getBalances(PortfolioDTO portfolio){
        return null;
    }

    @Override
    public double getStdev(List<Profit> profits){
        return 0;
    }

    @Override
    public int getBestYear(List<Profit> profits){

        int year = 0;
        double rate = 0;

        for(Profit profit : profits){
                if(rate < profit.getRate()){
                    rate = profit.getRate();
                    year = profit.getDate().getYear();
                }
        }

        return year;
    }

    @Override
    public int getWorstYear(List<Profit> profits){

        int year = 0;
        double rate = 0;

        for(Profit profit : profits){
            if(rate > profit.getRate()){
                rate = profit.getRate();
                year = profit.getDate().getYear();
            }
        }

        return year;
    }

    @Override
    public double getMDD(List<Fall> falls){

        int high = 0;
        int low = Integer.MAX_VALUE;

        for(Fall fall : falls){
            high = high < fall.getHigh()? fall.getHigh() : high;
            low = low > fall.getLow()? fall.getLow() : low;
        }

        return (high - low) / high * 100;
    }

}
