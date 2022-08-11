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
        List<StockDataView> stocks = stockPriceDataViewRepository.findAllByStockCodeAndTradeDateBetween(code, LocalDate.of(startYear, 1, 1), LocalDate.of(endYear, 12, 31));

        log.debug("service stocks size : " + stocks.size());
        log.debug("service first stock : " + stocks.get(0));
        return stocks;
    }

    public PortfolioDTO getStockAmount(PortfolioDTO portfolio, List<List<StockDataView>> stocks){
        int len = stocks.size();
        List<Integer> amount = new ArrayList<>();
        long money = portfolio.getDeposit();
        int change = 0;
        for(int i=0; i<len; i++){
            int available = (int) (money * portfolio.getPercentage().get(i) / 100);
            amount.add(available / stocks.get(i).get(0).getLastPrice());
            change += available - (stocks.get(i).get(0).getLastPrice()) * amount.get(i);
        }
        log.debug("stock amount : " + amount.toString());
        log.debug("stock change : " + change);
        portfolio.setStockAmount(amount);
        portfolio.setChange(change);

        return portfolio;
    }

    @Override
    public double getCAGR(long startPrice, long endPrice, int years){

        double div = endPrice / (double)startPrice;
        double term = 1 / (double)years;

        double cagr = Math.pow(div,term)  - 1.0;

        log.debug("year : " + years);
        log.debug("div : " + div);
        log.debug("term : " + term);
        log.debug("debugging cagr : " + cagr);
        log.debug("cagr : " + Math.round(cagr * 100 * 100) / 100.0);

        // Math.round(Math.sqrt(varianceRate) * 10) / 10.0
        return Math.round(cagr * 100 * 100) / 100.0;
    }

    @Override
    public Profit getProfitRate(LocalDate date, double nowPrice, double boughtPrice){

        double rate = Math.round((double)(nowPrice - boughtPrice) / boughtPrice * 100 * 100) / 100.0;

        return Profit.builder().date(date).rate(rate).build();
    }

    @Override
    public Fall getFalls(List<StockData> stocks){

        int high = 0;
        int low = Integer.MAX_VALUE;

         for(StockData stock : stocks){
             int last = Integer.parseInt(stock.getLastPrice());

             high = high < last ? last : high;
             low = low > last ? last : low;
         }

         double rate = (high - low) / high * 100;

        return Fall.builder()
                //.year(stocks.get(0).getTradeDate().getYear())
                //.month(stocks.get(0).getTradeDate().getMonthValue())
                .high(high)
                .low(low)
                .fall(rate)
                .build();
    }

    @Override
    public List<Balance> getBalances(PortfolioDTO portfolio, List<List<StockDataView>> stocks){
        List<Balance> balances = new ArrayList<>();
        List<Integer> amount = portfolio.getStockAmount();

        int dateSize = stocks.get(0).size();
        int stockSize = stocks.size();

        for(int i=0; i<dateSize; i++){
            long balance = portfolio.getChange();
            for(int j=0; j<stockSize; j++){
                balance += stocks.get(j).get(i).getLastPrice() * amount.get(j);
            }
            balances.add(Balance.builder().date(stocks.get(0).get(i).getTradeDate()).balance(balance).build());
        }

        return balances;
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

        return Math.round(Math.sqrt(varianceRate) * 100) / 100.0;
    }

    @Override
    public double getBestYear(List<Profit> profits){

        int year = 0;
        double rate = 0;

        for(Profit profit : profits){
                if(rate < profit.getRate()){
                    rate = profit.getRate();
                    year = profit.getDate().getYear();
                }
        }

        return rate;
    }

    @Override
    public double getWorstYear(List<Profit> profits){

        int year = 0;
        double rate = 0;

        for(Profit profit : profits){
            if(rate > profit.getRate()){
                rate = profit.getRate();
                year = profit.getDate().getYear();
            }
        }

        return rate;
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
