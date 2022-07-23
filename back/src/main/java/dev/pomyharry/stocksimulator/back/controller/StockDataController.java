package dev.pomyharry.stocksimulator.back.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import dev.pomyharry.stocksimulator.back.model.dto.CustomerDTO;
import dev.pomyharry.stocksimulator.back.model.dto.StockDTO;
import dev.pomyharry.stocksimulator.back.model.dto.StockDataDTO;
import dev.pomyharry.stocksimulator.back.model.entity.WatchStock;
import dev.pomyharry.stocksimulator.back.model.entity.StockData;
import dev.pomyharry.stocksimulator.back.service.StockDataService;

@CrossOrigin(origins = "*")
@RestController
public class StockDataController {

    private final StockDataService stockChartService;

    public StockDataController(StockDataService stockChartService) {
        this.stockChartService = stockChartService;
    }

    @GetMapping("/stock-data")
    public ResponseEntity<?> getStockChart(@AuthenticationPrincipal String customerId) {
        List<WatchStock> watch = stockChartService.findAllStocks(customerId);
        List<StockDTO> s = stockChartService.getStockChart(watch); 
        List<StockDataDTO> a = stockChartService.getStockData(watch.get(0).getStock().getCode());
 
        Map<String, Object> result = new HashMap<String,Object>();
        result.put("a", a);
        result.put("s", s);
        return ResponseEntity.ok().body(result);

    }
}
