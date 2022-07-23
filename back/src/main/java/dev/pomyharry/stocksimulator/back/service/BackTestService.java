package dev.pomyharry.stocksimulator.back.service;

import dev.pomyharry.stocksimulator.back.model.dto.backtest.BackTestDTO;
import dev.pomyharry.stocksimulator.back.model.dto.backtest.Balance;
import dev.pomyharry.stocksimulator.back.model.dto.backtest.Fall;
import dev.pomyharry.stocksimulator.back.model.dto.backtest.Profit;
import dev.pomyharry.stocksimulator.back.model.dto.portfolio.PortfolioDTO;
import dev.pomyharry.stocksimulator.back.model.entity.StockData;
import dev.pomyharry.stocksimulator.back.model.entity.StockDataView;

import java.time.LocalDate;
import java.util.List;

public interface BackTestService {

    public List<StockData> getStocksByCodeAndPeriod(String code, int startYear, int endYear);

    public List<StockDataView> getStocksByCodeAndPeriodOfView(String code, int startYear, int endYear);

    public double getCAGR(long startPrice, long endPrice, int years);

    public Profit getProfitRate(LocalDate date, double nowPrice, double boughtPrice);

    public Fall getFalls(List<StockData> stocks);

    public List<Balance> getBalances(PortfolioDTO portfolio, List<List<StockDataView>> stocks);

    public double getStdev(List<Profit> profits);

    public int getBestYear(List<Profit> profits);

    public int getWorstYear(List<Profit> profits);

    public double getMDD(List<Fall> falls);

    PortfolioDTO getStockAmount(PortfolioDTO portfolio, List<List<StockDataView>> stockList);
}
