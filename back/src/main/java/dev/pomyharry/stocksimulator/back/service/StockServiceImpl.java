package dev.pomyharry.stocksimulator.back.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.pomyharry.stocksimulator.back.model.entity.Stock;
import dev.pomyharry.stocksimulator.back.repository.StockRepository;

@Service
public class StockServiceImpl implements StockService {

    @Autowired
    StockRepository stockRepository;

    @Override
    public List<Stock> findAllStocks() {
        List<Stock> stocks = stockRepository.findAll();

        for (Stock s : stocks) {
            System.out.println(s);
        }

        return stocks;
    }

}
