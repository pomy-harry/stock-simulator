package dev.pomyharry.stocksimulator.back.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.pomyharry.stocksimulator.back.model.dto.MyStockDTO;
import dev.pomyharry.stocksimulator.back.service.MyStockService;

@CrossOrigin(origins = "*")
@RestController
public class MyStockController {

    private final MyStockService myStockService;

    public MyStockController(MyStockService myStockService) {
        this.myStockService = myStockService;
    }

<<<<<<< HEAD
    
    @RequestMapping("/buystock")
=======
    @RequestMapping("/api/v1/createmystock")
>>>>>>> a70ddc57d2ae854fff8d302df9ff4ef1dbc67571
    @PostMapping
    public void buyStock(@RequestBody MyStockDTO myStockDTO) {

<<<<<<< HEAD
        try{            
            myStockService.buyStock(myStockDTO);
            
        }catch(Exception e) {
=======
        try {
            myStockService.buyStock(myStockDTO);
            return ResponseEntity.ok().body(myStockDTO);

        } catch (Exception e) {
>>>>>>> a70ddc57d2ae854fff8d302df9ff4ef1dbc67571
            System.out.println(e.getMessage());
        }

    }

    @PostMapping("my-stock")
    public ResponseEntity<?> searchStock(@RequestBody MyStockDTO myStock) {

        try {
            List<MyStockDTO> myStocks = myStockService.findAllMyStockByCustomerId(myStock.getCustomerId());
            return ResponseEntity.ok().body(myStocks);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

}
