package dev.pomyharry.stocksimulator.back.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.GenericGenerator;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class MyStock {

    @Id
    @Column(name = "MYSTOCK_ID")
    @GeneratedValue(generator = "mystock-uuid")
    @GenericGenerator(name = "mystock-uuid", strategy = "uuid2")
    private String Id;

    @Column(name = "AMOUNT")
    private int amount;
    
    @Column(name = "TOTAL_BUY_PRICE")
    private long totalBuyPrice;

    @ManyToOne
    @JoinColumn(name = "CUSTOMER_ID")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "STOCK_CODE")
    private Stock stock;

    public MyStock(int amount, long totalBuyPrice, Customer customer, Stock stock) {
        this.amount = amount;
        this.totalBuyPrice = totalBuyPrice;
        this.customer = customer;
        this.stock = stock;
    }
    
}
