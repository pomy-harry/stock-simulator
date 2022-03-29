package dev.pomyharry.stocksimulator.back.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WatchStockDTO {

    private long index;
    private String code;
    private String customerId;

    public WatchStockDTO(String code, String customerId) {
        this.code = code;
        this.customerId = customerId;
    }

}
