package dev.pomyharry.stocksimulator.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.pomyharry.stocksimulator.back.model.entity.WatchStock;
import dev.pomyharry.stocksimulator.back.repository.WatchStockRepository;
import dev.pomyharry.stocksimulator.back.exception.DuplicationException;

@Service
public class WatchStockServiceImpl implements WatchStockService {

    @Autowired
    WatchStockRepository watchStockRepository;

    @Override
    public WatchStock createWatchList(WatchStock stock) {
        WatchStock watch = watchStockRepository.findByStockAndCustomer(stock.getStock(), stock.getCustomer());

        if (watch != null) {
            throw new DuplicationException("이미 등록된 관심종목입니다.");
        }
        System.out.println(stock);
        return watchStockRepository.save(stock);
    }

}
