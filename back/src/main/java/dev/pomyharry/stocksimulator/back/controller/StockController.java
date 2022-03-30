package dev.pomyharry.stocksimulator.back.controller;

import java.util.List;
import java.util.stream.Collectors;

import dev.pomyharry.stocksimulator.back.model.dto.StockDTO;
import dev.pomyharry.stocksimulator.back.model.entity.Stock;
import dev.pomyharry.stocksimulator.back.service.StockService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/stocks")
public class StockController {

    private final StockService stockService;

    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    @GetMapping
    public List<StockDTO> getStockList() {
        try {
            List<Stock> stockList = stockService.findAllStocks();

            List<StockDTO> stocks = stockList.stream().map(stock -> new StockDTO(stock.getCode(), stock.getName()))
                    .collect(Collectors.toList());

            return stocks;
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

}
