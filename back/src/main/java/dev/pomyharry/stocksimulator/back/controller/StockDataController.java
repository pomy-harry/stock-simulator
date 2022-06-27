package dev.pomyharry.stocksimulator.back.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.pomyharry.stocksimulator.back.model.dto.CustomerDTO;
import dev.pomyharry.stocksimulator.back.model.dto.StockDTO;
import dev.pomyharry.stocksimulator.back.model.entity.WatchStock;
import dev.pomyharry.stocksimulator.back.service.StockDataService;

@CrossOrigin(origins = "*")
@RestController
public class StockDataController {

    private final StockDataService stockChartService;

    public StockDataController(StockDataService stockChartService) {
        this.stockChartService = stockChartService;
    }

    @RequestMapping("/stock-data")
    @PostMapping
    public ResponseEntity<?> getStockChart(@AuthenticationPrincipal String customerId) {
        List<WatchStock> watch = stockChartService.findAllStocks(customerId);
        List<StockDTO> s = stockChartService.getStockChart(watch);

        return ResponseEntity.ok().body(s);
    }
}
