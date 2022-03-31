package dev.pomyharry.stocksimulator.back.service;

import java.util.List;

import org.springframework.stereotype.Service;

import dev.pomyharry.stocksimulator.back.controller.component.MarketInfoComponent;
import dev.pomyharry.stocksimulator.back.model.dto.MarketInfoDTO;

@Service
public class MarketInfoServiceImpl implements MarketInfoService{

    private final MarketInfoComponent marketInfoComponent;

    public MarketInfoServiceImpl(MarketInfoComponent marketInfoComponent) {
        this.marketInfoComponent = marketInfoComponent;
    }

    public List<MarketInfoDTO> getMarketInfo() {
        return marketInfoComponent.getMarketInfo();
    }
    
}
