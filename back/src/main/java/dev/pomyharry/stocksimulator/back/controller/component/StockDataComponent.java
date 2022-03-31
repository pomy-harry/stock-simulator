package dev.pomyharry.stocksimulator.back.controller.component;

import java.io.IOException;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import dev.pomyharry.stocksimulator.back.model.dto.StockDTO;
import dev.pomyharry.stocksimulator.back.model.entity.WatchStock;

@Component
public class StockDataComponent {
    
    public StockDTO getStockChart(WatchStock watchStock) {;

        String stockCode = watchStock.getStock().getCode();
        String stockName = watchStock.getStock().getName();
  
          final String stockChart = "https://finance.naver.com/item/main.naver?code="+stockCode;
          final String stockPrice = "https://finance.naver.com/item/sise.naver?code="+stockCode;
          Connection connChart = Jsoup.connect(stockChart);
          Connection connPrice = Jsoup.connect(stockPrice);
          
          try {
            Document chartDocument = connChart.get();
            Elements stockChartBody = chartDocument.select("div.chart img");
            StringBuilder sbChart = new StringBuilder(); 
            sbChart.append(stockChartBody.attr("src"));
            String chartUrl = sbChart.toString().replace("area", "candle");
            
            Document priceDocument = connPrice.get();
            Elements stockPriceBody = priceDocument.select("table.type2.type_tax");
  
            String price = stockPriceBody.select("strong#_nowVal").text();
            String change = stockPriceBody.select("strong#_diff").text();
            String changeRate = stockPriceBody.select("strong#_rate").text();
  
            return new StockDTO(stockCode, stockName, price, change, changeRate ,chartUrl);

          } catch (IOException ignored) {
          }
  
          return null;
      }

}
