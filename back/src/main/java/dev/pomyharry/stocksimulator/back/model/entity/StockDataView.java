package dev.pomyharry.stocksimulator.back.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StockDataView {

    @Id
    @Column(name = "STOCK_DATA_ID")
    private String id;

    @Column(name = "TRADE_DATE")
    private LocalDate tradeDate;

    //@ManyToOne
    @JoinColumn(name = "STOCK_CODE")
    private String stockCode;
    //private Stock stock;

    @Column(name = "HIGH_PRICE")
    private int highPrice;

    @Column(name = "LOW_PRICE")
    private int lowPrice;

    @Column(name = "START_PRICE")
    private int startPrice;

    @Column(name = "LAST_PRICE")
    private int lastPrice;

    @Column(name = "TRADE_VOLUME")
    private int tradeVolume;
}
