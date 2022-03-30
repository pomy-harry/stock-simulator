package dev.pomyharry.stocksimulator.back.service;

import dev.pomyharry.stocksimulator.back.model.entity.WatchStock;
import dev.pomyharry.stocksimulator.back.model.entity.Customer;

public interface WatchStockService {

    WatchStock createWatchList(WatchStock stock);

    void deleteAllWatchList(Customer customer);
}
