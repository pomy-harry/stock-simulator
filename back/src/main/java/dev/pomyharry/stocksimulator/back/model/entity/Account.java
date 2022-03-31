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
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Account {

    @Id
    @Column(name = "ACCOUNT_ID")
    @GeneratedValue(generator = "account-uuid")
    @GenericGenerator(name = "account-uuid", strategy = "uuid2")
    private String id;

    @Column(name = "ACCOUNT_NAME")
    private String name;

    @Column(name = "DEPOSIT")
    private long deposit;

    @ManyToOne
    @JoinColumn(name = "CUSTOMER_ID")
    private Customer customer;

}
