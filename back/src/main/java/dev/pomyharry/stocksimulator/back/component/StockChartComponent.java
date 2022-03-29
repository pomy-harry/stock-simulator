package dev.pomyharry.stocksimulator.back.component;

import java.io.IOException;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import dev.pomyharry.stocksimulator.back.model.dto.StockDTO;

@Component
public class StockChartComponent {
    
    public StockDTO getStockChart(StockDTO stock) {

      String stockCode = stock.getCode();
      String stockName = stock.getName();

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

          return new StockDTO(stockName, stockCode, price, change, changeRate ,chartUrl);
        } catch (IOException ignored) {
        }

        return null;
      }
}
