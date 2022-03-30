package dev.pomyharry.stocksimulator.back.controller;

import dev.pomyharry.stocksimulator.back.model.dto.CustomerDTO;
import dev.pomyharry.stocksimulator.back.model.dto.WatchStockDTO;
import dev.pomyharry.stocksimulator.back.model.entity.WatchStock;
import dev.pomyharry.stocksimulator.back.model.entity.Customer;
import dev.pomyharry.stocksimulator.back.model.entity.Stock;
import dev.pomyharry.stocksimulator.back.service.WatchStockService;
import dev.pomyharry.stocksimulator.back.service.CustomerService;
import dev.pomyharry.stocksimulator.back.service.StockService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/stocks")
public class WatchStockController {

    @Autowired
    private WatchStockService watchStockService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private StockService stockService;

    @PostMapping("/watch")
    public void createWatchList(@RequestBody WatchStockDTO watchStock) {
        try {
            Customer customer = customerService.findById(watchStock.getCustomerId());
            Stock stock = stockService.findByCode(watchStock.getCode());
            watchStockService.createWatchList(new WatchStock(stock, customer));
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
    @RequestMapping("/findAllWatchStockByCustomerId")
    @PostMapping
    public List<WatchStockDTO> findAllWatchStockByCustomerId(@RequestBody CustomerDTO customerDTO) {
        try {
            String customerId = customerDTO.getId();
            return watchStockService.findAllWatchStockByCustomerId(customerId);      
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }
}
