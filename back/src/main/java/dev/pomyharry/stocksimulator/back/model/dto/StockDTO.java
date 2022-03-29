package dev.pomyharry.stocksimulator.back.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StockDTO {

    private String code;

    private String name;

    private String price;

    private String change; // 전일대비 변동가격

    private String changeRate;

    private String chartUrl;

    StockDTO(String code, String name) {
        this.code = code;
        this.name = name;
    }
    
}
