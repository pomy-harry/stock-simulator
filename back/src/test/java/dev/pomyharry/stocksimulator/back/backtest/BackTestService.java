package dev.pomyharry.stocksimulator.back.backtest;

import dev.pomyharry.stocksimulator.back.model.dto.backtest.BackTestDTO;
import dev.pomyharry.stocksimulator.back.model.dto.backtest.Balance;
import dev.pomyharry.stocksimulator.back.model.dto.backtest.Fall;
import dev.pomyharry.stocksimulator.back.model.dto.backtest.Profit;
import dev.pomyharry.stocksimulator.back.model.dto.portfolio.PortfolioDTO;
import dev.pomyharry.stocksimulator.back.model.entity.StockData;

import java.util.List;

public interface BackTestService {

    public BackTestDTO getBackTestResult(PortfolioDTO portfolio);

    //public List<StockData> getStocksByCodeAndPeriod(String code, int startYear, int endYear);
    public List<StockData> getStocksByCodeAndPeriod(String code, int startYear, int endYear);

    public double getCAGR(long startPrice, long endPrice, int years);

    public PortfolioDTO rebalancePortfolio(PortfolioDTO portfolio);

    public Profit getProfitRate(int year, int month, int nowPrice, int boughtPrice);

    public Fall getFalls(List<StockData> stocks);

    public Balance getBalances(PortfolioDTO portfolio);

    public double getStdev(List<Profit> profits);

    public int getBestYear(List<Profit> profits);

    public int getWorstYear(List<Profit> profits);

    public double getMDD(List<Fall> falls);

}
