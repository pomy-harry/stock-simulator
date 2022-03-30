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

    @Column(name = "BUY_PRICE")
    private long buyPrice;

    @Column(name = "AMOUNT")
    private int amount;

    @ManyToOne
    @JoinColumn(name = "CUSTOMER_ID")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "STOCK_CODE")
    private Stock stock;
    
}
