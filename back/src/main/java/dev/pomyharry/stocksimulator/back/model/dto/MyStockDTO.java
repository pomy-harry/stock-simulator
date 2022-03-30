package dev.pomyharry.stocksimulator.back.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MyStockDTO {

    private String id;
    private long buyPrice;
    private int amount;
    private String customerId;
    private String stockCode;

    public MyStockDTO (long buyPrice, int amount, String customerId, String stockCode) {
        this.buyPrice = buyPrice;
        this.amount = amount;
        this.customerId = customerId;
        this.stockCode = stockCode;
    } 

    public MyStockDTO (String id, long buyPrice, int amount) {
        this.id = id;
        this.buyPrice = buyPrice;
        this.amount = amount;
    } 
    
}
