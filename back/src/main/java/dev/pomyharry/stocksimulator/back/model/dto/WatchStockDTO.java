package dev.pomyharry.stocksimulator.back.model.dto;

import dev.pomyharry.stocksimulator.back.model.entity.WatchStock;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WatchStockDTO {

    private long index;
    private String code;
    private String name;
    private String customerId;

}
