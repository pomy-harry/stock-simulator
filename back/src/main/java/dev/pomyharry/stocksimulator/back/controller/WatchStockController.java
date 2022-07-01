package dev.pomyharry.stocksimulator.back.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/watch")
    public ResponseEntity<?> createWatchList(@AuthenticationPrincipal String customerId, @RequestParam(value="code") String code) {
        try {
            Customer customer = customerService.findById(customerId);
            Stock stock = stockService.findByCode(code);
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

    @GetMapping("/watch-list")
    public ResponseEntity<?> findAllWatchStockByCustomerId(@AuthenticationPrincipal String customerId) {
        try {
            List<WatchStockDTO> watchList = watchStockService.findAllWatchStockByCustomerId(customerId);
            return ResponseEntity.ok().body(watchList);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/watch")
    public ResponseEntity<?> deleteByStockCode(@AuthenticationPrincipal String customerId, @RequestBody StockDTO stock) {
        try {
            watchStockService.deleteByCustomerIdAndStockCode(customerId, stock.getCode());
            return ResponseEntity.ok().body("success");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
