package dev.pomyharry.stocksimulator.back.service;

import java.util.List;

import dev.pomyharry.stocksimulator.back.model.dto.WatchStockDTO;
import dev.pomyharry.stocksimulator.back.model.entity.WatchStock;
import dev.pomyharry.stocksimulator.back.model.entity.Customer;

public interface WatchStockService {

    WatchStock createWatchList(WatchStock stock);

    void deleteAllWatchList(Customer customer);

    List<WatchStockDTO> findAllWatchStockByCustomerId(String customerId);

}
