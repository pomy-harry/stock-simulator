package dev.pomyharry.stocksimulator.back.model.dto;

import dev.pomyharry.stocksimulator.back.model.entity.WatchStock;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WatchStockDTO {


    private long index;
    private String code;
    private String name;
    private String customerId;

    public WatchStockDTO(String code, String customerId) {
        this.code = code;
        this.customerId = customerId;
    }

    public WatchStockDTO(WatchStock watchStock) {
        this.index = watchStock.getIndex();
        this.code = watchStock.getStock().getCode();
        this.customerId = watchStock.getCustomer().getId();
    }

    public WatchStockDTO(WatchStock watchStock, String name) {
        this.index = watchStock.getIndex();
        this.code = watchStock.getStock().getCode();
        this.customerId = watchStock.getCustomer().getId();
        this.name = name;
    }

}
