package dev.pomyharry.stocksimulator.back.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class StockData {

    @Id
    @Column(name = "STOCK_DATA_ID")
    private String stockDataId;

    @Column(name = "TRADE_DATE")
    private String tradeDate;

    @Column(name = "STOCK_CODE")
    private String stockCode;

    @Column(name = "HIGH_PRICE")
    private String highPrice;

    @Column(name = "LOW_PRICE")
    private String lowPrice;

    @Column(name = "START_PRICE")
    private String startPrice;

    @Column(name = "LAST_PRICE")
    private String lastPrice;

    @Column(name = "TRADE_VOLUME")
    private String tradeVolume;

}
