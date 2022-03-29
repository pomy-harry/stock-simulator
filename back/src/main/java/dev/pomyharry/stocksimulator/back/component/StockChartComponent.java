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
    
    public String getStockChart(StockDTO stock) {

      String stockCode = stock.getCode();

        final String stockChart = "https://finance.naver.com/item/main.naver?code="+stockCode;
        Connection conn = Jsoup.connect(stockChart);
        
        Document document;
        try {
          document = conn.get();
          Elements stockChartBody = document.select("div.chart img");
          StringBuilder sb = new StringBuilder(); 
          sb.append(stockChartBody.attr("src"));
          String chartUrl = sb.toString().replace("area", "candle");
          return chartUrl;
        } catch (IOException ignored) {
        }
        return null;
      }
}
