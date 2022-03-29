package dev.pomyharry.stocksimulator.back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import dev.pomyharry.stocksimulator.back.model.dto.StockDTO;
import dev.pomyharry.stocksimulator.back.service.StockChartService;

@CrossOrigin(origins = "*")
@RestController
public class StockChartController {
    
    private final StockChartService stockChartService;
    
    public StockChartController(StockChartService stockChartService) {
        this.stockChartService = stockChartService;
    }

    @PostMapping("/chart")
    public ResponseEntity<?> getStockChart(@RequestBody(required = true) StockDTO stock){
        StockDTO s = stockChartService.getStockChart(stock);
        return ResponseEntity.ok().body(s);
    }
}
