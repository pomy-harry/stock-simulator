package dev.pomyharry.stocksimulator.back.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    public MyStockDTO (int amount, String customerId, String stockCode, long buyPrice) {
        this.amount = amount;
        this.customerId = customerId;
        this.stockCode = stockCode;
        this.buyPrice = buyPrice;
    }

    public MyStockDTO (long sellPrice, int amount, String customerId, String stockCode) {
        this.sellPrice = sellPrice;
        this.amount = amount;
        this.customerId = customerId;
        this.stockCode = stockCode;
    }


    public MyStockDTO (int amount, long totalBuyPrice, String customerId, String stockCode) {
        this.amount = amount;
        this.totalBuyPrice = totalBuyPrice;
        this.customerId = customerId;
        this.stockCode = stockCode;
    }

    public MyStockDTO (String id, long totalBuyPrice, int amount) {
        this.id = id;
        this.totalBuyPrice = totalBuyPrice;
        this.amount = amount;
    }

    public MyStockDTO(long totalBuyPrice, int amount, String stockCode, String name, long nowPrice) {
        this.totalBuyPrice = totalBuyPrice;
        this.amount = amount;
        this.stockCode = stockCode;
        this.name = name;
        this.nowPrice = nowPrice;
    }

}
