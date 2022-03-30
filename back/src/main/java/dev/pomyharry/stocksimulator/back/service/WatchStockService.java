package dev.pomyharry.stocksimulator.back.service;

import java.util.List;

import dev.pomyharry.stocksimulator.back.model.dto.WatchStockDTO;
import dev.pomyharry.stocksimulator.back.model.entity.WatchStock;

public interface WatchStockService {

    WatchStock createWatchList(WatchStock stock);

    List<WatchStockDTO> findAllWatchStockByCustomerId(String customerId);
}
