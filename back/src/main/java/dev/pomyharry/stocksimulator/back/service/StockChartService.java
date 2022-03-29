package dev.pomyharry.stocksimulator.back.service;

import org.springframework.stereotype.Service;

import dev.pomyharry.stocksimulator.back.component.StockChartComponent;
import dev.pomyharry.stocksimulator.back.model.dto.StockDTO;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StockChartService {

    private final StockChartComponent stockChartComponent;

    public String getStockChart(StockDTO stock) {
        return stockChartComponent.getStockChart(stock);
    }
}
