package dev.pomyharry.stocksimulator.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.pomyharry.stocksimulator.back.model.entity.WatchStock;
import dev.pomyharry.stocksimulator.back.repository.WatchStockRepository;

@Service
public class WatchStockServiceImpl implements WatchStockService {

    @Autowired
    WatchStockRepository watchStockRepository;

    @Override
    public WatchStock createWatchList(WatchStock stock) {
        System.out.println(stock);
        return watchStockRepository.save(stock);
    }

}
