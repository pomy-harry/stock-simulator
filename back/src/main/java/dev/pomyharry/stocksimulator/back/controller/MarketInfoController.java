package dev.pomyharry.stocksimulator.back.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.pomyharry.stocksimulator.back.model.dto.MarketInfoDTO;
import dev.pomyharry.stocksimulator.back.service.MarketInfoService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/market-info")
public class MarketInfoController {

    private final MarketInfoService marketInfoService;

    public MarketInfoController(MarketInfoService marketInfoService) {
        this.marketInfoService = marketInfoService;
    }

    @GetMapping
    public ResponseEntity<?> getMarketInfo(@AuthenticationPrincipal String customerId) {
        try {
            List<MarketInfoDTO> market = marketInfoService.getMarketInfo();
            System.out.println(market);
            return ResponseEntity.ok().body(market);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
