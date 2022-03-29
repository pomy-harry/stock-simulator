package dev.pomyharry.stocksimulator.back.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.pomyharry.stocksimulator.back.model.entity.Stock;
import dev.pomyharry.stocksimulator.back.repository.StockRepository;
import dev.pomyharry.stocksimulator.back.exception.IdNotFoundException;

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

    @Override
    public Stock findByCode(String code) {
        Stock stock = stockRepository.findByCode(code);

        if (stock == null) {
            throw new IdNotFoundException("해당하는 종목이 없습니다.");
        }

        return stock;
    }

}
