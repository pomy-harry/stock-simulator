package dev.pomyharry.stocksimulator.back.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.pomyharry.stocksimulator.back.exception.DuplicationException;
import dev.pomyharry.stocksimulator.back.model.dto.CustomerDTO;
import dev.pomyharry.stocksimulator.back.model.dto.ErrorResponseDTO;
import dev.pomyharry.stocksimulator.back.model.dto.StockDTO;
import dev.pomyharry.stocksimulator.back.model.dto.WatchStockDTO;
import dev.pomyharry.stocksimulator.back.model.entity.Customer;
import dev.pomyharry.stocksimulator.back.model.entity.Stock;
import dev.pomyharry.stocksimulator.back.model.entity.WatchStock;
import dev.pomyharry.stocksimulator.back.service.CustomerService;
import dev.pomyharry.stocksimulator.back.service.StockService;
import dev.pomyharry.stocksimulator.back.service.WatchStockService;

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
    public ResponseEntity<?> createWatchList(@RequestBody WatchStockDTO watchStock) {
        try {
            Customer customer = customerService.findById(watchStock.getCustomerId());
            Stock stock = stockService.findByCode(watchStock.getCode());
            watchStockService.createWatchList(new WatchStock(stock, customer));

            return ResponseEntity.ok().body("success");
        } catch (Exception e) {
            if (e instanceof DuplicationException) {
                System.out.println(e.getMessage());
                return ResponseEntity.badRequest().body(new ErrorResponseDTO(e.getMessage()));
            } else {

                return ResponseEntity.badRequest().body(new ErrorResponseDTO());
            }
        }
    }

    @RequestMapping("/watch-list")
    @PostMapping
    public ResponseEntity<?> findAllWatchStockByCustomerId(@RequestBody CustomerDTO customerDTO) {
        try {
            String customerId = customerDTO.getId();
            List<WatchStockDTO> watchList = watchStockService.findAllWatchStockByCustomerId(customerId);
            return ResponseEntity.ok().body(watchList);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/watch")
    public ResponseEntity<?> deleteByStockCode(@RequestBody StockDTO stock) {
        try {
            watchStockService.deleteByStockCode(stock.getCode());
            return ResponseEntity.ok().body("success");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
