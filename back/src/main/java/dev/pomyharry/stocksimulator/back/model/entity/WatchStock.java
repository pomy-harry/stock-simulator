package dev.pomyharry.stocksimulator.back.model.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.GeneratedValue;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.GenericGenerator;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class WatchStock {

    @Id
    @Column(name = "WATCH_ID")
    @GeneratedValue(generator = "customer-uuid")
    @GenericGenerator(name = "customer-uuid", strategy = "uuid")
    private String id;

    @Column(name = "WATCH_INDEX")
    @ColumnDefault("0")
    private long index;

    @ManyToOne
    @JoinColumn(name = "STOCK_CODE")
    private Stock stock;

    @ManyToOne
    @JoinColumn(name = "CUSTOMER_ID")
    private Customer customer;

    public WatchStock(Stock stock, Customer customer) {
        this.stock = stock;
        this.customer = customer;
    }

    public WatchStock(Stock stock) {
        this.stock = stock;
    }

}
