package dev.pomyharry.stocksimulator.back.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StockData {

    @Id
    @Column(name = "STOCK_DATA_ID")
    @GeneratedValue(generator = "account-uuid")
    @GenericGenerator(name = "account-uuid", strategy = "uuid2")
    private String id;

    @Column(name = "TRADE_DATE")
    private Date date;

    @ManyToOne
    @JoinColumn(name = "STOCK_CODE")
    private Stock stock;

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
