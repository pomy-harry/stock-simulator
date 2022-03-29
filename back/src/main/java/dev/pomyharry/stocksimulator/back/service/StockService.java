package dev.pomyharry.stocksimulator.back.service;

import java.util.List;
import dev.pomyharry.stocksimulator.back.model.entity.Stock;

public interface StockService {

    List<Stock> findAllStocks();

}
