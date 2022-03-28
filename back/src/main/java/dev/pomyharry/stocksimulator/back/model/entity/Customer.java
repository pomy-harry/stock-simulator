package dev.pomyharry.stocksimulator.back.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Customer {

    @Id
    @Column(name = "CUSTOMER_ID")
    @GeneratedValue(generator = "customer-uuid")
    @GenericGenerator(name = "customer-uuid", strategy = "uuid")
    private String id;

    @Column(name = "CUSTOMER_NAME")
    private String name;

    @Column(name = "CUSTOMER_EMAIL")
    private String email;

    @Column(name = "CUSTOMER_PW")
    private String password;

    @Column(name = "ACCOUNT_ID")
    private String account_id;

    public Customer(String name, String email, String pw) {
        this.name = name;
        this.email = email;
        this.password = pw;
    }

}
