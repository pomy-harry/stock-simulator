package dev.pomyharry.stocksimulator.back.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.pomyharry.stocksimulator.back.model.dto.MyStockDTO;
import dev.pomyharry.stocksimulator.back.service.MyStockService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/stocks")
public class MyStockController {

    private final MyStockService myStockService;

    public MyStockController(MyStockService myStockService) {
        this.myStockService = myStockService;
    }

    @RequestMapping("/buy-stock")
    @PostMapping
    public ResponseEntity<?> buyStock(@AuthenticationPrincipal String customerId, @RequestBody MyStockDTO myStockDTO) {

        try {
            myStockService.buyStock(customerId, myStockDTO);
            return ResponseEntity.ok().body("success");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @RequestMapping("/sell-stock")
    @PostMapping
    public ResponseEntity<?> sellStock(@AuthenticationPrincipal String customerId, @RequestBody MyStockDTO myStockDTO) {

        try {
            myStockService.sellStock(customerId, myStockDTO);
            return ResponseEntity.ok().body("success");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @PostMapping("my-stock")
    public ResponseEntity<?> searchStock(@AuthenticationPrincipal String customerId, @RequestBody MyStockDTO myStock) {

        try {
            List<MyStockDTO> myStocks = myStockService.findAllMyStockByCustomerId(customerId);
            return ResponseEntity.ok().body(myStocks);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

}
