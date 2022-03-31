package dev.pomyharry.stocksimulator.back.controller.component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import dev.pomyharry.stocksimulator.back.model.dto.MarketInfoDTO;

@Component
public class MarketInfoComponent {
    
    public List<MarketInfoDTO> getMarketInfo() {

        List<MarketInfoDTO> newsList = new ArrayList<>();

        final String baseUrl = "https://finance.naver.com/";

        final String marketInfo = "https://finance.naver.com/news/mainnews.naver";
        Connection connChart = Jsoup.connect(marketInfo);
          
        try {
          Document marketInfoDocs = connChart.get();
          Elements marketInfoBody = marketInfoDocs.select("li.block1");

          for(Element e : marketInfoBody) {
            String img = e.select("dt.thumb img").attr("src");
            String link = baseUrl + e.select("dd.articleSubject a").attr("href");
            String title = e.select("dd.articleSubject").text();
            String description = e.select("dd.articleSummary").text();

            newsList.add(new MarketInfoDTO(img, link, title, description));
          }

          return newsList;
        } catch (IOException ignored) {
        }
        
        return null;
      }

}
