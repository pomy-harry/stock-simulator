package dev.pomyharry.stocksimulator.back.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.pomyharry.stocksimulator.back.model.dto.MarketInfoDTO;
import dev.pomyharry.stocksimulator.back.service.MarketInfoService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/marketInfo")
public class MarketInfoController {

    private final MarketInfoService marketInfoService;

    public MarketInfoController(MarketInfoService marketInfoService) {
        this.marketInfoService = marketInfoService;
    }

    @GetMapping
    public List<MarketInfoDTO> getMarketInfo() {
        try {
            return marketInfoService.getMarketInfo();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return null;
    }
    
}
