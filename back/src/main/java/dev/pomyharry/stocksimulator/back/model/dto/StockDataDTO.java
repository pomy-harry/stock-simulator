package dev.pomyharry.stocksimulator.back.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor

public class StockDataDTO {

    private String stockDataId;

    private String tradeDate;

    private String stockCode;
    
    private String highPrice; 

    private String lowPrice;

    private String startPrice;

    private String lastPrice;
    
    private String tradeVolume;
}
