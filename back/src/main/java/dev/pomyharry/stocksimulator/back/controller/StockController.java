package dev.pomyharry.stocksimulator.back.controller;

import java.util.List;
import java.util.stream.Collectors;

import dev.pomyharry.stocksimulator.back.model.dto.StockDTO;
import dev.pomyharry.stocksimulator.back.model.entity.Stock;
import dev.pomyharry.stocksimulator.back.service.StockService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/stocks")
public class StockController {

    private final StockService stockService;

    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    @GetMapping
    public ResponseEntity<?> getStockList() {
        try {
            List<Stock> stockList = stockService.findAllStocks();

            List<StockDTO> stocks = stockList.stream()
                    .map(stock -> StockDTO.builder().code(stock.getCode()).name(stock.getName()).build())
                    .collect(Collectors.toList());

            return ResponseEntity.ok().body(stocks);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/code")
    public StockDTO findByCode(@RequestParam(value="code") String code) {
        try {
            Stock stock = stockService.findByCode(code);

            return StockDTO.builder().code(stock.getCode()).name(stock.getName()).build();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

}
