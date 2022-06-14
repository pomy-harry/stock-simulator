package dev.pomyharry.stocksimulator.back.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
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

}
