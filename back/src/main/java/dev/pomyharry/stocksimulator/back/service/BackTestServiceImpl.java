package dev.pomyharry.stocksimulator.back.service;

import dev.pomyharry.stocksimulator.back.model.dto.backtest.BackTestDTO;
import dev.pomyharry.stocksimulator.back.model.dto.backtest.Balance;
import dev.pomyharry.stocksimulator.back.model.dto.backtest.Fall;
import dev.pomyharry.stocksimulator.back.model.dto.backtest.Profit;
import dev.pomyharry.stocksimulator.back.model.dto.portfolio.PortfolioDTO;
import dev.pomyharry.stocksimulator.back.model.entity.StockData;
import dev.pomyharry.stocksimulator.back.model.entity.StockDataView;
import dev.pomyharry.stocksimulator.back.repository.StockPriceDataViewRepository;
import dev.pomyharry.stocksimulator.back.service.BackTestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Slf4j
@Service
public class BackTestServiceImpl implements BackTestService {
//
//    @Autowired
//    private StockPriceDataRepository stockPriceDataRepository;
//
    @Autowired
    private StockPriceDataViewRepository stockPriceDataViewRepository;

    @Override
    public List<StockData> getStocksByCodeAndPeriod(String code, int startYear, int endYear){

        //List<StockData> stocks = stockPriceDataRepository.findAllByStockCodeAndTradeDateBetween("005930", new Date(startYear, 1, 1), new Date(endYear, 12, 31));
        //List<StockData> stocks = stockPriceDataRepository.findAllByStockCode(code);
        //log.debug(stocks.get(0).toString());
        //log.debug("hello world" + code);

        return null;
    }

    @Override
    public List<StockDataView> getStocksByCodeAndPeriodOfView(String code, int startYear, int endYear){
        List<StockDataView> stocks = stockPriceDataViewRepository.findAllByStockCodeAndTradeDateBetween("005930", LocalDate.of(startYear, 1, 1), LocalDate.of(endYear, 12, 31));

        log.debug("service stocks size : " + stocks.size());
        log.debug("service first stock : " + stocks.get(0));
        return stocks;
    }

    public PortfolioDTO getStockAmount(PortfolioDTO portfolio, List<List<StockDataView>> stocks){
        int len = stocks.size();
        List<Integer> amount = new ArrayList<>();
        long money = portfolio.getDeposit();
        long deposit = 0l;
        for(int i=0; i<len; i++){
            int available = (int) (money * portfolio.getPercentage().get(i));
            amount.add(available / stocks.get(i).get(0).getLastPrice());
            deposit += available - ((int)(available / stocks.get(i).get(0).getLastPrice()));
        }

        portfolio.setStockAmount(amount);

        return portfolio;
    }

    @Override
    public double getCAGR(long startPrice, long endPrice, int years){

        double cagr = Math.pow(((double)endPrice / (double)startPrice), (double)(1 / (double)years)) - 1.0;

        log.debug("debugging : " + cagr);

        return Math.round(cagr * 100 * 10) /10.0;
    }

    @Override
    public Profit getProfitRate(int year, int month, double nowPrice, double boughtPrice){

        double rate = (double)(nowPrice - boughtPrice) / (double)boughtPrice * 100;

        return Profit.builder().date(LocalDate.of(year, month, 1)).rate(rate).build();
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
                .year(stocks.get(0).getTradeDate().getYear())
                .month(stocks.get(0).getTradeDate().getMonthValue())
                .high(high)
                .low(low)
                .fall(rate)
                .build();
    }

    @Override
    public Balance getBalances(PortfolioDTO portfolio){
        long balance = portfolio.getDeposit();

        int len = portfolio.getCodes().size();
        List<Integer> prices = portfolio.getStockPrices();
        List<Integer> amount = portfolio.getStockAmount();
        for(int i=0; i<len; i++){
            balance += prices.get(i) * amount.get(i);
        }

        return Balance.builder().date(LocalDate.of(portfolio.getStartYear(), portfolio.getMonth(), 1)).balance(balance).build();
    }

    @Override
    public double getStdev(List<Profit> profits){

        double sumRate = 0d;

        for(Profit profit : profits){
            sumRate += profit.getRate();
        }

        double meanRate = sumRate / profits.size();

        log.debug("mean : "+meanRate);

        double varianceRate = 0d;

        for(Profit profit : profits){
            varianceRate += Math.pow(meanRate - profit.getRate(), 2);
        }

        varianceRate /= profits.size();

        log.debug("variance : " +varianceRate);

        return Math.round(Math.sqrt(varianceRate) * 10) / 10.0;
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
