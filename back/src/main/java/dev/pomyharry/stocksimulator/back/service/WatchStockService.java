package dev.pomyharry.stocksimulator.back.service;

import dev.pomyharry.stocksimulator.back.model.entity.WatchStock;

public interface WatchStockService {

    WatchStock createWatchList(WatchStock stock);
}
