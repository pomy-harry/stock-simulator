package dev.pomyharry.stocksimulator.back.service;

import java.util.List;

import dev.pomyharry.stocksimulator.back.model.dto.CustomerDTO;
import dev.pomyharry.stocksimulator.back.model.dto.StockDTO;
import dev.pomyharry.stocksimulator.back.model.entity.WatchStock;

public interface StockDataService {

    List<WatchStock> findAllStocks(String customerId);

    public List<StockDTO> getStockChart(List<WatchStock> watchStocks);

}