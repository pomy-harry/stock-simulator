package dev.pomyharry.stocksimulator.back.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MyStockDTO {

    private String id;
    private long totalBuyPrice;
    private int amount;
    private String customerId;
    private String stockCode;
    private long buyPrice;
    private String name;
    private long nowPrice;
    private long sellPrice;

}
