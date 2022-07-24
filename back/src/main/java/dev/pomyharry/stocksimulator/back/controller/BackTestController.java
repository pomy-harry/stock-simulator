package dev.pomyharry.stocksimulator.back.controller;

import dev.pomyharry.stocksimulator.back.model.dto.backtest.BackTestDTO;
import dev.pomyharry.stocksimulator.back.model.dto.backtest.Balance;
import dev.pomyharry.stocksimulator.back.model.dto.backtest.Fall;
import dev.pomyharry.stocksimulator.back.model.dto.backtest.Profit;
import dev.pomyharry.stocksimulator.back.model.dto.portfolio.PortfolioDTO;
import dev.pomyharry.stocksimulator.back.model.entity.StockDataView;
import dev.pomyharry.stocksimulator.back.service.BackTestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@CrossOrigin(origins = "*")
@RestController
public class BackTestController {

    @Autowired
    private BackTestService service;

    @PostMapping("/backtest")
    public ResponseEntity<?> getBackTestResult(@AuthenticationPrincipal String customerId, @RequestBody PortfolioDTO portfolio){
        log.debug("controller code : " + portfolio.getCodes().get(0));

        List<List<StockDataView>> stockList = new ArrayList<>();
        int startYear = portfolio.getStartYear();
        int endYear = portfolio.getEndYear();

        for(String s : portfolio.getCodes()){
            stockList.add(service.getStocksByCodeAndPeriodOfView(s, startYear, endYear));
        }

        int len = stockList.get(0).size();
        int listLen = stockList.size();

        long startMoney;
        long endMoney = 0l;
        double cagr = 0d;
        double stdev = 0d;
        double bestYear = 0;
        double worstYear = 0;
        double mdd = 0l;
        List<Balance> balances = new ArrayList<>();
        List<Fall> falls = new ArrayList<>();
        List<Profit> profits = new ArrayList<>();

        startMoney = portfolio.getDeposit();
        portfolio = service.getStockAmount(portfolio, stockList);

        long bought = 0l;

        for(int i=0; i<len; i++){
            for(int j=0; j<listLen; j++){
                if(i == 0){
                    bought += stockList.get(j).get(i).getLastPrice() * portfolio.getStockAmount().get(j);
                    continue;
                }

                long now = stockList.get(j).get(i).getLastPrice() * portfolio.getStockAmount().get(j);
                profits.add(service.getProfitRate(stockList.get(j).get(i).getTradeDate(), now, bought));
                bought = now;
            }
        }

        balances = service.getBalances(portfolio, stockList);

        endMoney = balances.get(balances.size() - 1).getBalance();

        stdev = service.getStdev(profits);
        bestYear = service.getBestYear(profits);
        worstYear = service.getWorstYear(profits);
        cagr = service.getCAGR(startMoney, endMoney, endYear - startYear + 1);

        BackTestDTO bactest = BackTestDTO.builder()
                .startMoney(startMoney)
                .endMoney(endMoney)
                .cagr(cagr)
                .stdev(stdev)
                .bestYear(bestYear)
                .worstYear(worstYear)
                .mdd(mdd)
                .balances(balances)
                .falls(falls)
                .profits(profits)
                .build();

        return ResponseEntity.ok().body(bactest);
    }

}
