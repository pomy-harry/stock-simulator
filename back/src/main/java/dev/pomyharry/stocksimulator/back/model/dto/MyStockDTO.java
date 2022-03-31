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
    private long price;

    public MyStockDTO (int amount, String customerId, String stockCode, long buyPrice) {
        this.amount = amount;
        this.customerId = customerId;
        this.stockCode = stockCode;
        this.buyPrice = buyPrice;
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

    public MyStockDTO(long buyPrice, int amount, String name, long price) {
        this.buyPrice = buyPrice;
        this.amount = amount;
        this.name = name;
        this.price = price;
    }

}
