package dev.pomyharry.stocksimulator.back.service;

import java.util.List;

import dev.pomyharry.stocksimulator.back.model.dto.MarketInfoDTO;

public interface MarketInfoService {
    List<MarketInfoDTO> getMarketInfo();
}
