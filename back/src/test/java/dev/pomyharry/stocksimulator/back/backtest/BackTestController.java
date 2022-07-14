package dev.pomyharry.stocksimulator.back.backtest;

import dev.pomyharry.stocksimulator.back.model.dto.backtest.BackTestDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BackTestController {

    @PostMapping("/backtest")
    public ResponseEntity<?> getBackTestResult(@AuthenticationPrincipal String customerId, @RequestBody BackTestDTO backtestDTO){
        return null;
    }
}
